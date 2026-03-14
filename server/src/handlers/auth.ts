import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma, ApiError, validateEmail } from '../utils/helpers';
import { generateToken } from '../middleware/auth';

// Define AuthProvider enum locally to match Prisma schema
enum AuthProvider {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TIKTOK = 'TIKTOK',
}

interface SignUpBody {
  email: string;
  authProvider: string;
  authProviderId?: string;
}

interface SignInBody {
  email: string;
}

export async function handleSignUp(
  request: FastifyRequest<{ Body: SignUpBody }>,
  reply: FastifyReply
) {
  try {
    const { email, authProvider, authProviderId } = request.body;

    if (!email || !validateEmail(email)) {
      throw new ApiError(400, 'Invalid email');
    }

    // Normalize and validate authProvider - default to EMAIL if not provided
    let normalizedProvider: string = (authProvider || 'EMAIL').toUpperCase().trim();
    
    // Map common provider names to enum values
    const providerMap: { [key: string]: string } = {
      'EMAIL': 'EMAIL',
      'GOOGLE': 'GOOGLE',
      'FACEBOOK': 'FACEBOOK',
      'TIKTOK': 'TIKTOK',
    };

    if (!providerMap[normalizedProvider]) {
      normalizedProvider = 'EMAIL'; // Default to EMAIL for unknown providers
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          authProvider: normalizedProvider as AuthProvider,
          authProviderId: authProviderId || undefined,
        },
      });
    }

    const token = generateToken(user.id);

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
        isRoomLead: user.isRoomLead,
      },
      token,
      isNewUser: !user.nickname,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send({ error: error.message });
    }
    console.error('SignUp error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function handleSignIn(
  request: FastifyRequest<{ Body: SignInBody }>,
  reply: FastifyReply
) {
  try {
    const { email } = request.body;

    if (!email || !validateEmail(email)) {
      throw new ApiError(400, 'Invalid email');
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const token = generateToken(user.id);

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
        isRoomLead: user.isRoomLead,
      },
      token,
      isNewUser: false,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send({ error: error.message });
    }
    console.error('SignIn error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function handleVerifyToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    if (!request.userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const user = await prisma.user.findUnique({
      where: { id: request.userId },
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
        isRoomLead: user.isRoomLead,
      },
      isValid: true,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send({ error: error.message });
    }
    console.error('Verify token error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
