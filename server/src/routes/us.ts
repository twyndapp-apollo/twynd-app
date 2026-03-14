import type { FastifyInstance, FastifyRequest } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import { ApiError, prisma } from '../utils/helpers';

// Server only knows public identity (nickname, avatar).
// All personal profile data (status, location, profile cards) is device-local.

interface RoomIdParams { roomId: string }
interface NicknameBody { nickname: string }

export async function registerUsRoutes(app: FastifyInstance) {

  // GET /api/us/:roomId
  // Returns the public identity (nickname + avatar) of both room members.
  // The mobile app merges this with locally-stored profile data to build the Us screen.
  app.get<{ Params: RoomIdParams }>(
    '/us/:roomId',
    { preHandler: authenticateToken },
    async (request: FastifyRequest<{ Params: RoomIdParams }>, reply) => {
      try {
        const { roomId } = request.params;
        if (!request.userId) throw new ApiError(401, 'Unauthorized');

        const room = await prisma.room.findUnique({
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

        if (!room) throw new ApiError(404, 'Room not found');

        const me      = room.members.find((m: { userId: string }) => m.userId === request.userId);
        const partner = room.members.find((m: { userId: string }) => m.userId !== request.userId);

        if (!me) throw new ApiError(403, 'You are not a member of this room');

        return reply.send({
          me:      me.user,
          partner: partner?.user ?? null,
        });
      } catch (error) {
        if (error instanceof ApiError) return reply.code(error.statusCode).send({ error: error.message });
        console.error('Get us members error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // PATCH /api/us/nickname
  // Nickname is the only Us-related field persisted on server (needed for room invites & chat).
  app.patch<{ Body: NicknameBody }>(
    '/us/nickname',
    { preHandler: authenticateToken },
    async (request: FastifyRequest<{ Body: NicknameBody }>, reply) => {
      try {
        if (!request.userId) throw new ApiError(401, 'Unauthorized');
        const { nickname } = request.body;

        if (!nickname?.trim()) throw new ApiError(400, 'Nickname cannot be empty');
        if (nickname.trim().length > 30) throw new ApiError(400, 'Nickname cannot exceed 30 characters');

        const updated = await prisma.user.update({
          where: { id: request.userId },
          data: { nickname: nickname.trim() },
          select: { id: true, nickname: true },
        });

        return reply.send(updated);
      } catch (error) {
        if (error instanceof ApiError) return reply.code(error.statusCode).send({ error: error.message });
        console.error('Update nickname error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
}
