"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChatRoutes = registerChatRoutes;
const auth_1 = require("../middleware/auth");
const helpers_1 = require("../utils/helpers");
async function registerChatRoutes(app) {
    // Get chat sessions
    app.get('/chat/sessions', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { roomId } = request.query;
            if (!roomId) {
                throw new helpers_1.ApiError(400, 'roomId is required');
            }
            const sessions = await helpers_1.prisma.chatSession.findMany({
                where: { roomId },
                orderBy: { lastMessageAt: 'desc' },
            });
            return reply.send(sessions);
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError) {
                return reply.code(error.statusCode).send({ error: error.message });
            }
            console.error('Get chat sessions error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // Create chat session
    app.post('/chat/sessions', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { roomId, gameType } = request.body;
            if (!roomId) {
                throw new helpers_1.ApiError(400, 'roomId is required');
            }
            const session = await helpers_1.prisma.chatSession.create({
                data: {
                    roomId,
                    gameType,
                    title: gameType || 'Chat',
                },
            });
            return reply.send(session);
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError) {
                return reply.code(error.statusCode).send({ error: error.message });
            }
            console.error('Create chat session error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // Get messages
    app.get('/chat/sessions/:chatSessionId/messages', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { chatSessionId } = request.params;
            const { limit = '50' } = request.query;
            const messages = await helpers_1.prisma.message.findMany({
                where: { chatSessionId },
                orderBy: { createdAt: 'desc' },
                take: parseInt(limit),
            });
            return reply.send(messages.reverse());
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError) {
                return reply.code(error.statusCode).send({ error: error.message });
            }
            console.error('Get messages error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // Send message
    app.post('/chat/sessions/:chatSessionId/messages', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { chatSessionId } = request.params;
            const { content, contentType = 'text' } = request.body;
            if (!request.userId) {
                throw new helpers_1.ApiError(401, 'Unauthorized');
            }
            const message = await helpers_1.prisma.message.create({
                data: {
                    chatSessionId,
                    senderId: request.userId,
                    content,
                    contentType,
                },
            });
            // Update session's last message timestamp
            await helpers_1.prisma.chatSession.update({
                where: { id: chatSessionId },
                data: { lastMessageAt: new Date() },
            });
            return reply.send(message);
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError) {
                return reply.code(error.statusCode).send({ error: error.message });
            }
            console.error('Send message error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // Mark as read
    app.patch('/chat/messages/:messageId/read', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { messageId } = request.params;
            const message = await helpers_1.prisma.message.update({
                where: { id: messageId },
                data: { isRead: true, readAt: new Date() },
            });
            return reply.send(message);
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError) {
                return reply.code(error.statusCode).send({ error: error.message });
            }
            console.error('Mark as read error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
}
//# sourceMappingURL=chat.js.map