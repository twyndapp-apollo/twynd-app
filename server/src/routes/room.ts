import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import {
  handleCreateRoom,
  handleGetRoom,
  handleJoinRoom,
  handleGetQRCode,
  handleAcceptConnection,
} from '../handlers/room';

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
}
