import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma, ApiError, validateEmail } from '../utils/helpers';
import { generateToken } from '../middleware/auth';

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

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          authProvider,
          authProviderId: authProviderId || undefined,
          language: 'en',
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
        language: user.language,
        isRoomLead: user.isRoomLead,
        showAge: user.showAge,
        showZodiac: user.showZodiac,
        showBirthday: user.showBirthday,
        showLocation: user.showLocation,
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
        language: user.language,
        isRoomLead: user.isRoomLead,
        showAge: user.showAge,
        showZodiac: user.showZodiac,
        showBirthday: user.showBirthday,
        showLocation: user.showLocation,
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
        language: user.language,
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
