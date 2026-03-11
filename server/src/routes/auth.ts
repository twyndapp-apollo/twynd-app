import type { FastifyInstance } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import { handleSignUp, handleSignIn, handleVerifyToken } from '../handlers/auth';

export async function registerAuthRoutes(app: FastifyInstance) {
  // Sign up
  app.post('/auth/signup', async (request, reply) => {
    return handleSignUp(request, reply);
  });

  // Sign in
  app.post('/auth/signin', async (request, reply) => {
    return handleSignIn(request, reply);
  });

  // Verify token
  app.post('/auth/verify', { preHandler: authenticateToken }, async (request, reply) => {
    return handleVerifyToken(request, reply);
  });
}
