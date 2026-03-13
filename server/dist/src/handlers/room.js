"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreateRoom = handleCreateRoom;
exports.handleGetRoom = handleGetRoom;
exports.handleJoinRoom = handleJoinRoom;
exports.handleGetQRCode = handleGetQRCode;
exports.handleAcceptConnection = handleAcceptConnection;
const helpers_1 = require("../utils/helpers");
// Define enums locally to match Prisma schema
var RoomStatus;
(function (RoomStatus) {
    RoomStatus["WAITING_FOR_PARTNER"] = "WAITING_FOR_PARTNER";
    RoomStatus["ACTIVE"] = "ACTIVE";
    RoomStatus["COMPLETED"] = "COMPLETED";
    RoomStatus["ARCHIVED"] = "ARCHIVED";
})(RoomStatus || (RoomStatus = {}));
var RoomMemberRole;
(function (RoomMemberRole) {
    RoomMemberRole["LEAD"] = "LEAD";
    RoomMemberRole["FOLLOWER"] = "FOLLOWER";
})(RoomMemberRole || (RoomMemberRole = {}));
async function handleCreateRoom(request, reply) {
    try {
        if (!request.userId) {
            throw new helpers_1.ApiError(401, 'Unauthorized');
        }
        // Check if user has reached daily limit (for free users)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todaysRooms = await helpers_1.prisma.room.count({
            where: {
                members: {
                    some: {
                        userId: request.userId,
                        role: RoomMemberRole.LEAD,
                    },
                },
                createdAt: {
                    gte: today,
                },
            },
        });
        if (todaysRooms >= 1) {
            throw new helpers_1.ApiError(429, 'You can only create one room per day. Consider upgrading to unlock unlimited rooms.');
        }
        // Generate room code
        let code = '';
        let codeExists = true;
        while (codeExists) {
            code = (0, helpers_1.generateRoomCode)();
            const existing = await helpers_1.prisma.room.findUnique({ where: { code } });
            codeExists = !!existing;
        }
        const qrData = `twynd://room/${code}`;
        const qrCodeUrl = (0, helpers_1.generateQRCodeUrl)(qrData);
        const room = await helpers_1.prisma.room.create({
            data: {
                code,
                qrCodeUrl,
                status: RoomStatus.WAITING_FOR_PARTNER,
                members: {
                    create: {
                        userId: request.userId,
                        role: RoomMemberRole.LEAD,
                    },
                },
            },
        });
        // Update user as room lead
        await helpers_1.prisma.user.update({
            where: { id: request.userId },
            data: {
                currentRoomId: room.id,
                isRoomLead: true,
            },
        });
        return reply.send({
            id: room.id,
            code: room.code,
            qrCodeUrl: room.qrCodeUrl,
            status: room.status,
            createdAt: room.createdAt,
        });
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Create room error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleGetRoom(request, reply) {
    try {
        if (!request.userId) {
            throw new helpers_1.ApiError(401, 'Unauthorized');
        }
        const { roomId } = request.params;
        const room = await helpers_1.prisma.room.findUnique({
            where: { id: roomId },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                nickname: true,
                                avatar: true,
                                statusEmoji: true,
                                statusMessage: true,
                            },
                        },
                    },
                },
            },
        });
        if (!room) {
            throw new helpers_1.ApiError(404, 'Room not found');
        }
        return reply.send(room);
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Get room error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleJoinRoom(request, reply) {
    try {
        if (!request.userId) {
            throw new helpers_1.ApiError(401, 'Unauthorized');
        }
        const { roomCode } = request.body;
        const room = await helpers_1.prisma.room.findUnique({ where: { code: roomCode } });
        if (!room) {
            throw new helpers_1.ApiError(404, 'Room not found');
        }
        if (room.status !== RoomStatus.WAITING_FOR_PARTNER) {
            throw new helpers_1.ApiError(400, 'Room is not available for joining');
        }
        // Check if user is already in another room
        const existingMembership = await helpers_1.prisma.roomMember.findFirst({
            where: { userId: request.userId },
        });
        if (existingMembership) {
            throw new helpers_1.ApiError(400, 'You are already in another room');
        }
        // Add user to room as follower
        const member = await helpers_1.prisma.roomMember.create({
            data: {
                roomId: room.id,
                userId: request.userId,
                role: RoomMemberRole.FOLLOWER,
            },
        });
        // Update room status
        await helpers_1.prisma.room.update({
            where: { id: room.id },
            data: { status: RoomStatus.ACTIVE },
        });
        // Update user
        await helpers_1.prisma.user.update({
            where: { id: request.userId },
            data: { currentRoomId: room.id },
        });
        return reply.send({
            id: room.id,
            code: room.code,
            status: RoomStatus.ACTIVE,
            message: 'Successfully joined room',
        });
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Join room error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleGetQRCode(request, reply) {
    try {
        if (!request.userId) {
            throw new helpers_1.ApiError(401, 'Unauthorized');
        }
        const { roomId } = request.params;
        const room = await helpers_1.prisma.room.findUnique({ where: { id: roomId } });
        if (!room) {
            throw new helpers_1.ApiError(404, 'Room not found');
        }
        return reply.send({
            qrCodeUrl: room.qrCodeUrl,
            roomCode: room.code,
        });
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Get QR code error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleAcceptConnection(request, reply) {
    try {
        if (!request.userId) {
            throw new helpers_1.ApiError(401, 'Unauthorized');
        }
        const { leadsUserId, role } = request.body;
        // Create connection between users
        if (role === 'lead') {
            await helpers_1.prisma.user.update({
                where: { id: request.userId },
                data: { connectionPartnerId: leadsUserId, isRoomLead: true },
            });
        }
        else {
            await helpers_1.prisma.user.update({
                where: { id: request.userId },
                data: { connectionPartnerId: leadsUserId, isRoomLead: false },
            });
        }
        return reply.send({
            success: true,
            message: 'Connection accepted',
            role,
        });
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Accept connection error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
//# sourceMappingURL=room.js.map