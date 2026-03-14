"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoomRoutes = registerRoomRoutes;
const auth_1 = require("../middleware/auth");
const room_1 = require("../handlers/room");
const helpers_1 = require("../utils/helpers");
async function registerRoomRoutes(app) {
    // Create room
    app.post('/rooms', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleCreateRoom)(request, reply);
    });
    // Get room
    app.get('/rooms/:roomId', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleGetRoom)(request, reply);
    });
    // Join room
    app.post('/rooms/join', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleJoinRoom)(request, reply);
    });
    // Get QR code
    app.get('/rooms/:roomId/qrcode', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleGetQRCode)(request, reply);
    });
    // Accept connection
    app.post('/rooms/accept-connection', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleAcceptConnection)(request, reply);
    });
    // POST /api/rooms/leave — remove user from their current room
    app.post('/rooms/leave', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            if (!request.userId)
                throw new helpers_1.ApiError(401, 'Unauthorized');
            const user = await helpers_1.prisma.user.findUnique({
                where: { id: request.userId },
                select: { currentRoomId: true },
            });
            if (!user?.currentRoomId)
                throw new helpers_1.ApiError(400, 'You are not in a room');
            const roomId = user.currentRoomId;
            // Remove membership record
            await helpers_1.prisma.roomMember.deleteMany({ where: { roomId, userId: request.userId } });
            // Clear user's room reference
            await helpers_1.prisma.user.update({
                where: { id: request.userId },
                data: { currentRoomId: null, connectionPartnerId: null },
            });
            // Archive the room so the partner is notified on next open
            await helpers_1.prisma.room.update({
                where: { id: roomId },
                data: { status: 'ARCHIVED' },
            });
            return reply.code(204).send();
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Leave room error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
}
//# sourceMappingURL=room.js.map