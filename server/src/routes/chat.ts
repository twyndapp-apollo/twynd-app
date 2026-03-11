import type { FastifyInstance } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import { ApiError, prisma } from '../utils/helpers';

export async function registerChatRoutes(app: FastifyInstance) {
  // Get chat sessions
  app.get(
    '/chat/sessions',
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const { roomId } = request.query as { roomId: string };

        if (!roomId) {
          throw new ApiError(400, 'roomId is required');
        }

        const sessions = await prisma.chatSession.findMany({
          where: { roomId },
          orderBy: { lastMessageAt: 'desc' },
        });

        return reply.send(sessions);
      } catch (error) {
        if (error instanceof ApiError) {
          return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Get chat sessions error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Create chat session
  app.post(
    '/chat/sessions',
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const { roomId, gameType } = request.body as {
          roomId: string;
          gameType?: string;
        };

        if (!roomId) {
          throw new ApiError(400, 'roomId is required');
        }

        const session = await prisma.chatSession.create({
          data: {
            roomId,
            gameType,
            title: gameType || 'Chat',
          },
        });

        return reply.send(session);
      } catch (error) {
        if (error instanceof ApiError) {
          return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Create chat session error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Get messages
  app.get(
    '/chat/sessions/:chatSessionId/messages',
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const { chatSessionId } = request.params as { chatSessionId: string };
        const { limit = '50' } = request.query as { limit: string };

        const messages = await prisma.message.findMany({
          where: { chatSessionId },
          orderBy: { createdAt: 'desc' },
          take: parseInt(limit),
        });

        return reply.send(messages.reverse());
      } catch (error) {
        if (error instanceof ApiError) {
          return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Get messages error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Send message
  app.post(
    '/chat/sessions/:chatSessionId/messages',
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const { chatSessionId } = request.params as { chatSessionId: string };
        const { content, contentType = 'text' } = request.body as {
          content: string;
          contentType: string;
        };

        if (!request.userId) {
          throw new ApiError(401, 'Unauthorized');
        }

        const message = await prisma.message.create({
          data: {
            chatSessionId,
            senderId: request.userId,
            content,
            contentType,
          },
        });

        // Update session's last message timestamp
        await prisma.chatSession.update({
          where: { id: chatSessionId },
          data: { lastMessageAt: new Date() },
        });

        return reply.send(message);
      } catch (error) {
        if (error instanceof ApiError) {
          return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Send message error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Mark as read
  app.patch(
    '/chat/messages/:messageId/read',
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const { messageId } = request.params as { messageId: string };

        const message = await prisma.message.update({
          where: { id: messageId },
          data: { isRead: true, readAt: new Date() },
        });

        return reply.send(message);
      } catch (error) {
        if (error instanceof ApiError) {
          return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Mark as read error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
}
