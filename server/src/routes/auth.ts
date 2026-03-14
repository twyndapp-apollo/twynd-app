import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import { handleSignUp, handleSignIn, handleVerifyToken } from '../handlers/auth';
import { ApiError, prisma } from '../utils/helpers';

interface SignUpBody {
  email: string;
  authProvider: string;
  authProviderId?: string;
}

interface SignInBody {
  email: string;
}

export async function registerAuthRoutes(app: FastifyInstance) {
  // Sign up
  app.post<{ Body: SignUpBody }>('/auth/signup', async (request: FastifyRequest<{ Body: SignUpBody }>, reply) => {
    return handleSignUp(request, reply);
  });

  // Sign in
  app.post<{ Body: SignInBody }>('/auth/signin', async (request: FastifyRequest<{ Body: SignInBody }>, reply) => {
    return handleSignIn(request, reply);
  });

  // Verify token
  app.post('/auth/verify', { preHandler: authenticateToken }, async (request, reply) => {
    return handleVerifyToken(request, reply);
  });

  // DELETE /api/auth/account — permanently delete the user and all their data
  app.delete('/auth/account', { preHandler: authenticateToken }, async (request, reply) => {
    try {
      if (!request.userId) throw new ApiError(401, 'Unauthorized');
      // Cascade deletes handle: RoomMember, Subscription, Messages, etc.
      await prisma.user.delete({ where: { id: request.userId } });
      return reply.code(204).send();
    } catch (error) {
      if (error instanceof ApiError) return reply.code(error.statusCode).send({ error: error.message });
      console.error('Delete account error:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
