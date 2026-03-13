import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import {
  handleGetProfile,
  handleUpdateProfile,
  handleUpdateStatus,
} from '../handlers/user';

interface UpdateProfileBody {
  [key: string]: any;
}

interface UpdateStatusBody {
  emoji: string;
  message: string;
}

export async function registerUserRoutes(app: FastifyInstance) {
  // Get profile
  app.get(
    '/users/profile',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return handleGetProfile(request, reply);
    }
  );

  // Update profile
  app.patch<{ Body: UpdateProfileBody }>(
    '/users/profile',
    { preHandler: authenticateToken },
    async (request: FastifyRequest<{ Body: UpdateProfileBody }>, reply) => {
      return handleUpdateProfile(request, reply);
    }
  );

  // Update status
  app.patch<{ Body: UpdateStatusBody }>(
    '/users/status',
    { preHandler: authenticateToken },
    async (request: FastifyRequest<{ Body: UpdateStatusBody }>, reply) => {
      return handleUpdateStatus(request, reply);
    }
  );
}
