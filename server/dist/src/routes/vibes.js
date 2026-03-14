"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVibesRoutes = registerVibesRoutes;
const auth_1 = require("../middleware/auth");
const helpers_1 = require("../utils/helpers");
// ── Gemini poem generator ──────────────────────────────────────────────────────
async function generateMilestonePoem(milestoneTitle, description, daysTogetherCount) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
        return 'Your journey together is a poem being written,\nWith every day a new verse, every moment a rhyme.\nTwo souls intertwined, beautifully smitten,\nCelebrating this milestone, one heartbeat at a time.';
    }
    const prompt = `Write a short, romantic poem (4-6 lines) for a couple celebrating their "${milestoneTitle}" milestone. They have been together for ${daysTogetherCount} days. Context: ${description}. The poem should be warm, celebratory, and heartfelt. Return only the poem text, no title or extra commentary.`;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 200, temperature: 0.9 },
        }),
    });
    if (!res.ok)
        throw new Error('Gemini API request failed');
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? 'A poem for your special milestone.';
}
// ── Helpers ────────────────────────────────────────────────────────────────────
function calcDaysTogether(roomStartedAt) {
    if (!roomStartedAt)
        return 0;
    const ms = Date.now() - new Date(roomStartedAt).getTime();
    return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}
function defaultSummary(days) {
    if (days === 0)
        return "Your journey together is just beginning. Every great story starts with a first step.";
    if (days < 7)
        return `You're ${days} day${days > 1 ? 's' : ''} in — still in the beautiful early bloom of your connection.`;
    if (days < 30)
        return `${days} days of shared moments, laughter, and growing closer. You're building something real.`;
    if (days < 90)
        return `Over a month together — you've moved past the honeymoon spark into genuine, lasting connection.`;
    return `${days} days of choosing each other, every single day. That's no small thing. That's love in action.`;
}
// ── Route registration ─────────────────────────────────────────────────────────
async function registerVibesRoutes(app) {
    // GET /api/vibes/:roomId — Vibes dashboard data
    app.get('/vibes/:roomId', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { roomId } = request.params;
            const room = await helpers_1.prisma.room.findUnique({
                where: { id: roomId },
                include: {
                    milestones: { orderBy: { awardedAt: 'asc' } },
                    insights: { orderBy: { generatedAt: 'desc' }, take: 1 },
                },
            });
            if (!room)
                throw new helpers_1.ApiError(404, 'Room not found');
            const days = calcDaysTogether(room.roomStartedAt);
            const latestInsight = room.insights[0] ?? null;
            return reply.send({
                daysTogetherCount: days,
                roomStartedAt: room.roomStartedAt,
                milestones: room.milestones,
                latestInsight: latestInsight
                    ? {
                        id: latestInsight.id,
                        roomId: latestInsight.roomId,
                        generatedAt: latestInsight.generatedAt,
                        date: latestInsight.generatedAt,
                        relationshipMetrics: latestInsight.relationshipMetrics,
                        interestMetrics: latestInsight.interestMetrics,
                        sparkMetrics: latestInsight.sparkMetrics,
                        summaryText: latestInsight.summaryText,
                    }
                    : null,
                relationshipSummary: latestInsight?.summaryText ?? defaultSummary(days),
            });
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Get vibes error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // POST /api/milestones/:milestoneId/poem — Generate (or return cached) AI poem
    app.post('/milestones/:milestoneId/poem', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { milestoneId } = request.params;
            const milestone = await helpers_1.prisma.milestone.findUnique({
                where: { id: milestoneId },
                include: { room: { select: { roomStartedAt: true } } },
            });
            if (!milestone)
                throw new helpers_1.ApiError(404, 'Milestone not found');
            // Return cached poem if already generated
            if (milestone.aiGeneratedPoem) {
                return reply.send({ poem: milestone.aiGeneratedPoem });
            }
            const days = calcDaysTogether(milestone.room.roomStartedAt);
            const poem = await generateMilestonePoem(milestone.milestoneTitle, milestone.description ?? '', days);
            await helpers_1.prisma.milestone.update({
                where: { id: milestoneId },
                data: { aiGeneratedPoem: poem },
            });
            return reply.send({ poem });
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Generate poem error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // POST /api/milestones/:milestoneId/consent — Record share consent for current user
    app.post('/milestones/:milestoneId/consent', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { milestoneId } = request.params;
            const { consent } = request.body;
            if (!request.userId)
                throw new helpers_1.ApiError(401, 'Unauthorized');
            const milestone = await helpers_1.prisma.milestone.findUnique({
                where: { id: milestoneId },
                include: { room: { include: { members: true } } },
            });
            if (!milestone)
                throw new helpers_1.ApiError(404, 'Milestone not found');
            // Determine if current user is lead or follower in this room
            const member = milestone.room.members.find((m) => m.userId === request.userId);
            if (!member)
                throw new helpers_1.ApiError(403, 'You are not a member of this room');
            const isLead = member.role === 'LEAD';
            const updated = await helpers_1.prisma.milestone.update({
                where: { id: milestoneId },
                data: isLead
                    ? { leadConsentToShare: consent }
                    : { followerConsentToShare: consent },
            });
            return reply.send({
                leadConsentToShare: updated.leadConsentToShare,
                followerConsentToShare: updated.followerConsentToShare,
                bothConsented: updated.leadConsentToShare && updated.followerConsentToShare,
            });
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Consent error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // GET /api/milestones/:milestoneId/chat — Get or create the milestone chat session
    app.get('/milestones/:milestoneId/chat', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { milestoneId } = request.params;
            const milestone = await helpers_1.prisma.milestone.findUnique({
                where: { id: milestoneId },
                include: { chatSession: true },
            });
            if (!milestone)
                throw new helpers_1.ApiError(404, 'Milestone not found');
            if (milestone.chatSession) {
                return reply.send(milestone.chatSession);
            }
            // Create a new chat session linked to this milestone
            const chatSession = await helpers_1.prisma.chatSession.create({
                data: {
                    roomId: milestone.roomId,
                    title: `🏅 ${milestone.milestoneTitle}`,
                    gameType: 'milestone',
                },
            });
            await helpers_1.prisma.milestone.update({
                where: { id: milestoneId },
                data: { chatSessionId: chatSession.id },
            });
            return reply.send(chatSession);
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Milestone chat error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
}
//# sourceMappingURL=vibes.js.map