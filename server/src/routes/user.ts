import type { FastifyInstance } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import {
  handleGetProfile,
  handleUpdateProfile,
  handleUpdateStatus,
} from '../handlers/user';

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
  app.patch(
    '/users/profile',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return handleUpdateProfile(request, reply);
    }
  );

  // Update status
  app.patch(
    '/users/status',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return handleUpdateStatus(request, reply);
    }
  );
}
