"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSubscriptionRoutes = registerSubscriptionRoutes;
const auth_1 = require("../middleware/auth");
const helpers_1 = require("../utils/helpers");
const REFERRAL_VALIDITY_DAYS = 30;
const MAX_REFERRALS = 3;
const REFERRAL_EXTENSION_DAYS_PER = 30; // days added per qualifying referral
const REFERRAL_BASE_URL = 'https://twynd.app/join?ref=';
function referralExpiresAt(generatedAt) {
    return new Date(generatedAt.getTime() + REFERRAL_VALIDITY_DAYS * 24 * 60 * 60 * 1000);
}
async function registerSubscriptionRoutes(app) {
    // GET /api/subscription
    // Returns subscription status + referral info for the current user.
    app.get('/subscription', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            if (!request.userId)
                throw new helpers_1.ApiError(401, 'Unauthorized');
            const user = await helpers_1.prisma.user.findUnique({
                where: { id: request.userId },
                select: { isRoomLead: true, currentRoomId: true, subscription: true },
            });
            if (!user)
                throw new helpers_1.ApiError(404, 'User not found');
            const sub = user.subscription;
            if (!sub) {
                // No subscription record yet — user is free / lead hasn't activated
                return reply.send({
                    isSubscribed: false,
                    isTrial: false,
                    isLead: user.isRoomLead,
                    inRoom: !!user.currentRoomId,
                    referral: null,
                });
            }
            const now = new Date();
            const isSubscribed = sub.status === 'ACTIVE' && sub.endDate > now;
            const isTrial = isSubscribed && sub.isTrialPeriod;
            const expiresAt = referralExpiresAt(sub.referralGeneratedAt);
            const referralExpired = now > expiresAt;
            return reply.send({
                isSubscribed,
                isTrial,
                status: sub.status,
                endDate: sub.endDate,
                trialEndDate: sub.trialEndDate,
                isLead: user.isRoomLead,
                inRoom: !!user.currentRoomId,
                referral: {
                    code: sub.referralCode,
                    link: `${REFERRAL_BASE_URL}${sub.referralCode}`,
                    count: sub.referralCount,
                    maxReferrals: MAX_REFERRALS,
                    extensionDaysEarned: sub.referralExtensionDays,
                    generatedAt: sub.referralGeneratedAt,
                    expiresAt,
                    isExpired: referralExpired,
                    canRegenerate: referralExpired || sub.referralCount >= MAX_REFERRALS,
                },
            });
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Get subscription error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // POST /api/subscription/referral/regenerate
    // Issues a fresh referral link (resets the 30-day window).
    app.post('/subscription/referral/regenerate', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            if (!request.userId)
                throw new helpers_1.ApiError(401, 'Unauthorized');
            const sub = await helpers_1.prisma.subscription.findUnique({
                where: { userId: request.userId },
            });
            if (!sub)
                throw new helpers_1.ApiError(404, 'No subscription found');
            const updated = await helpers_1.prisma.subscription.update({
                where: { userId: request.userId },
                data: { referralGeneratedAt: new Date() },
            });
            const expiresAt = referralExpiresAt(updated.referralGeneratedAt);
            return reply.send({
                link: `${REFERRAL_BASE_URL}${updated.referralCode}`,
                generatedAt: updated.referralGeneratedAt,
                expiresAt,
            });
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Regenerate referral error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // POST /api/subscription/referral/use
    // Called when a new user signs up via a referral link.
    // Adds 30-day extension to the referrer's room (if under max).
    app.post('/subscription/referral/use', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            const { referralCode } = request.body;
            if (!referralCode)
                throw new helpers_1.ApiError(400, 'referralCode is required');
            const referrerSub = await helpers_1.prisma.subscription.findUnique({
                where: { referralCode },
            });
            if (!referrerSub)
                throw new helpers_1.ApiError(404, 'Invalid referral code');
            const now = new Date();
            const expiresAt = referralExpiresAt(referrerSub.referralGeneratedAt);
            if (now > expiresAt)
                throw new helpers_1.ApiError(410, 'Referral link has expired');
            if (referrerSub.referralCount >= MAX_REFERRALS)
                throw new helpers_1.ApiError(409, 'Referral limit reached');
            await helpers_1.prisma.subscription.update({
                where: { id: referrerSub.id },
                data: {
                    referralCount: { increment: 1 },
                    referralExtensionDays: { increment: REFERRAL_EXTENSION_DAYS_PER },
                    endDate: new Date(referrerSub.endDate.getTime() + REFERRAL_EXTENSION_DAYS_PER * 24 * 60 * 60 * 1000),
                },
            });
            return reply.send({ success: true, extensionDaysAdded: REFERRAL_EXTENSION_DAYS_PER });
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Use referral error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
}
//# sourceMappingURL=subscription.js.map