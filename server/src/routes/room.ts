import type { FastifyInstance } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import {
  handleCreateRoom,
  handleGetRoom,
  handleJoinRoom,
  handleGetQRCode,
  handleAcceptConnection,
} from '../handlers/room';

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
  app.get(
    '/rooms/:roomId',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return handleGetRoom(request, reply);
    }
  );

  // Join room
  app.post(
    '/rooms/join',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return handleJoinRoom(request, reply);
    }
  );

  // Get QR code
  app.get(
    '/rooms/:roomId/qrcode',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return handleGetQRCode(request, reply);
    }
  );

  // Accept connection
  app.post(
    '/rooms/accept-connection',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return handleAcceptConnection(request, reply);
    }
  );
}
