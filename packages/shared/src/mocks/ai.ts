import { realAI } from './realAI';

// Simulates the same interface as the real AI service
export const AI = {
  isReady: () => __DEV__ ? true : realAI.isReady(),

  extractFacts: async (messages: string[]) => {
    if (__DEV__) {
      await delay(600); // simulate processing time
      return [
        { fact: 'Loves Korean food', category: 'preferences', confidence: 0.85 },
        { fact: 'Works night shifts', category: 'identity',    confidence: 0.78 },
      ];
    }
    return realAI.extractFacts(messages);
  },

  generateVibes: async (context: object) => {
    if (__DEV__) {
      await delay(800);
      return {
        summary: 'A strong week. More playful than usual.',
        metrics: {
          warmth: { trend: 'up', insight: 'Most affectionate messages yet.' },
          depth: { trend: 'up', insight: 'Opened up about something new.' },
          playfulness: { trend: 'steady', insight: 'Good energy throughout.' },
        }
      };
    }
    return realAI.generateVibes(context);
  },
};

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));