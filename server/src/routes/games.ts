import type { FastifyInstance } from 'fastify';
import { authenticateToken } from '../middleware/auth';
import { ApiError } from '../utils/helpers';

// Mock questions for games
const GAME_QUESTIONS: Record<string, any[]> = {
  love_map_builder: [
    { id: '1', question: "What's your partner's favorite color?", category: 'preferences' },
    { id: '2', question: 'What is their biggest dream?', category: 'values' },
    { id: '3', question: 'What brings them the most joy?', category: 'interests' },
  ],
  this_or_that: [
    { id: '1', question: 'Coffee or Tea?', category: 'preference', options: ['Coffee', 'Tea'] },
    { id: '2', question: 'Mountains or Beach?', category: 'preference', options: ['Mountains', 'Beach'] },
  ],
  two_truths_one_lie: [
    { id: '1', question: 'Tell us two truths and one lie about yourself', category: 'game' },
  ],
  question_roulette: [
    { id: '1', question: 'What is your biggest fear?', category: 'deep' },
    { id: '2', question: 'When did you last cry?', category: 'emotional' },
  ],
};

export async function registerGameRoutes(app: FastifyInstance) {
  // Get game questions
  app.get(
    '/games/:gameType/questions',
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const { gameType } = request.params as { gameType: string };

        const questions = GAME_QUESTIONS[gameType] || [];

        if (questions.length === 0) {
          throw new ApiError(404, `Game type "${gameType}" not found`);
        }

        return reply.send({
          gameType,
          questions,
          totalCount: questions.length,
        });
      } catch (error) {
        if (error instanceof ApiError) {
          return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Get game questions error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Submit game result
  app.post(
    '/chat/sessions/:chatSessionId/game-result',
    { preHandler: authenticateToken },
    async (request, reply) => {
      try {
        const { chatSessionId } = request.params as { chatSessionId: string };
        const { gameType, result } = request.body as {
          gameType: string;
          result: Record<string, any>;
        };

        // In a real app, this would save the result and run AI analysis
        return reply.send({
          success: true,
          message: 'Game result saved',
          gameType,
          resultId: `result_${Date.now()}`,
        });
      } catch (error) {
        if (error instanceof ApiError) {
          return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Submit game result error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
}
