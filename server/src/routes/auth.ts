import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import { handleSignUp, handleSignIn, handleVerifyToken } from '../handlers/auth';

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
}
