import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import {
  handleCreateRoom,
  handleGetRoom,
  handleJoinRoom,
  handleGetQRCode,
  handleAcceptConnection,
} from '../handlers/room';
import { ApiError, prisma } from '../utils/helpers';

interface RoomIdParams {
  roomId: string;
}

interface JoinRoomBody {
  roomCode: string;
}

interface AcceptConnectionBody {
  leadsUserId: string;
  role: string;
}

export async function registerRoomRoutes(app: FastifyInstance) {
  // Create room
  app.post(
    '/rooms',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return handleCreateRoom(request, reply);
    }
  );

  // Get room
  app.get<{ Params: RoomIdParams }>(
    '/rooms/:roomId',
    { preHandler: authenticateToken },
    async (request: FastifyRequest<{ Params: RoomIdParams }>, reply) => {
      return handleGetRoom(request, reply);
    }
  );

  // Join room
  app.post<{ Body: JoinRoomBody }>(
    '/rooms/join',
    { preHandler: authenticateToken },
    async (request: FastifyRequest<{ Body: JoinRoomBody }>, reply) => {
      return handleJoinRoom(request, reply);
    }
  );

  // Get QR code
  app.get<{ Params: RoomIdParams }>(
    '/rooms/:roomId/qrcode',
    { preHandler: authenticateToken },
    async (request: FastifyRequest<{ Params: RoomIdParams }>, reply) => {
      return handleGetQRCode(request, reply);
    }
  );

  // Accept connection
  app.post<{ Body: AcceptConnectionBody }>(
    '/rooms/accept-connection',
    { preHandler: authenticateToken },
    async (request: FastifyRequest<{ Body: AcceptConnectionBody }>, reply) => {
      return handleAcceptConnection(request, reply);
    }
  );

  // POST /api/rooms/leave — remove user from their current room
  app.post(
    '/rooms/leave',
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        if (!request.userId) throw new ApiError(401, 'Unauthorized');

        const user = await prisma.user.findUnique({
          where: { id: request.userId },
          select: { currentRoomId: true },
        });

        if (!user?.currentRoomId) throw new ApiError(400, 'You are not in a room');

        const roomId = user.currentRoomId;

        // Remove membership record
        await prisma.roomMember.deleteMany({ where: { roomId, userId: request.userId } });

        // Clear user's room reference
        await prisma.user.update({
          where: { id: request.userId },
          data: { currentRoomId: null, connectionPartnerId: null },
        });

        // Archive the room so the partner is notified on next open
        await prisma.room.update({
          where: { id: roomId },
          data: { status: 'ARCHIVED' },
        });

        return reply.code(204).send();
      } catch (error) {
        if (error instanceof ApiError) return reply.code(error.statusCode).send({ error: error.message });
        console.error('Leave room error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
}
