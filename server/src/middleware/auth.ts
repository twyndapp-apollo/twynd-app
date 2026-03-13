import type { FastifyRequest, FastifyReply } from 'fastify';
import * as jwt from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

export async function authenticateToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return reply.code(401).send({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    if (typeof decoded === 'object' && 'userId' in decoded) {
      request.userId = (decoded as { userId: string }).userId;
    }
  } catch (error) {
    return reply.code(403).send({ error: 'Invalid token' });
  }
}

export function generateToken(userId: string): string {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
}
