import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma, ApiError } from '../utils/helpers';

export async function handleGetProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    if (!request.userId) throw new ApiError(401, 'Unauthorized');

    const user = await prisma.user.findUnique({ where: { id: request.userId } });
    if (!user) throw new ApiError(404, 'User not found');

    return reply.send({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      avatar: user.avatar,
      isRoomLead: user.isRoomLead,
      currentRoomId: user.currentRoomId,
    });
  } catch (error) {
    if (error instanceof ApiError) return reply.code(error.statusCode).send({ error: error.message });
    console.error('Get profile error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function handleUpdateProfile(
  request: FastifyRequest<{ Body: Record<string, any> }>,
  reply: FastifyReply
) {
  try {
    if (!request.userId) throw new ApiError(401, 'Unauthorized');

    // Only nickname and avatar are persisted server-side; all personal data lives on-device.
    const updateData: Record<string, any> = {};
    for (const field of ['nickname', 'avatar'] as const) {
      if (field in request.body) updateData[field] = request.body[field];
    }

    const user = await prisma.user.update({
      where: { id: request.userId },
      data: updateData,
    });

    return reply.send({
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    if (error instanceof ApiError) return reply.code(error.statusCode).send({ error: error.message });
    console.error('Update profile error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function handleUpdateStatus(
  request: FastifyRequest<{ Body: { emoji: string; message: string } }>,
  reply: FastifyReply
) {
  // Status (emoji + message) is local-only; no server persistence needed.
  // This endpoint is kept for potential future relay use but is a no-op for now.
  return reply.code(204).send();
}
