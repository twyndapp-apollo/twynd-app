"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUsRoutes = registerUsRoutes;
const auth_1 = require("../middleware/auth");
const helpers_1 = require("../utils/helpers");
async function registerUsRoutes(app) {
    // GET /api/us/:roomId
    // Returns the public identity (nickname + avatar) of both room members.
    // The mobile app merges this with locally-stored profile data to build the Us screen.
    app.get('/us/:roomId', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { roomId } = request.params;
            if (!request.userId)
                throw new helpers_1.ApiError(401, 'Unauthorized');
            const room = await helpers_1.prisma.room.findUnique({
                where: { id: roomId },
                include: {
                    members: {
                        include: {
                            user: {
                                select: { id: true, nickname: true, avatar: true, isRoomLead: true },
                            },
                        },
                    },
                },
            });
            if (!room)
                throw new helpers_1.ApiError(404, 'Room not found');
            const me = room.members.find((m) => m.userId === request.userId);
            const partner = room.members.find((m) => m.userId !== request.userId);
            if (!me)
                throw new helpers_1.ApiError(403, 'You are not a member of this room');
            return reply.send({
                me: me.user,
                partner: partner?.user ?? null,
            });
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Get us members error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // PATCH /api/us/nickname
    // Nickname is the only Us-related field persisted on server (needed for room invites & chat).
    app.patch('/us/nickname', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            if (!request.userId)
                throw new helpers_1.ApiError(401, 'Unauthorized');
            const { nickname } = request.body;
            if (!nickname?.trim())
                throw new helpers_1.ApiError(400, 'Nickname cannot be empty');
            if (nickname.trim().length > 30)
                throw new helpers_1.ApiError(400, 'Nickname cannot exceed 30 characters');
            const updated = await helpers_1.prisma.user.update({
                where: { id: request.userId },
                data: { nickname: nickname.trim() },
                select: { id: true, nickname: true },
            });
            return reply.send(updated);
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Update nickname error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
}
//# sourceMappingURL=us.js.map