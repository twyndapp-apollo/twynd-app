"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignUp = handleSignUp;
exports.handleSignIn = handleSignIn;
exports.handleVerifyToken = handleVerifyToken;
const helpers_1 = require("../utils/helpers");
const auth_1 = require("../middleware/auth");
// Define AuthProvider enum locally to match Prisma schema
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["EMAIL"] = "EMAIL";
    AuthProvider["GOOGLE"] = "GOOGLE";
    AuthProvider["FACEBOOK"] = "FACEBOOK";
    AuthProvider["TIKTOK"] = "TIKTOK";
})(AuthProvider || (AuthProvider = {}));
async function handleSignUp(request, reply) {
    try {
        const { email, authProvider, authProviderId } = request.body;
        if (!email || !(0, helpers_1.validateEmail)(email)) {
            throw new helpers_1.ApiError(400, 'Invalid email');
        }
        // Normalize and validate authProvider - default to EMAIL if not provided
        let normalizedProvider = (authProvider || 'EMAIL').toUpperCase().trim();
        // Map common provider names to enum values
        const providerMap = {
            'EMAIL': 'EMAIL',
            'GOOGLE': 'GOOGLE',
            'FACEBOOK': 'FACEBOOK',
            'TIKTOK': 'TIKTOK',
        };
        if (!providerMap[normalizedProvider]) {
            normalizedProvider = 'EMAIL'; // Default to EMAIL for unknown providers
        }
        // Check if user already exists
        let user = await helpers_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Create new user
            user = await helpers_1.prisma.user.create({
                data: {
                    email,
                    authProvider: normalizedProvider,
                    authProviderId: authProviderId || undefined,
                    language: 'en',
                },
            });
        }
        const token = (0, auth_1.generateToken)(user.id);
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
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('SignUp error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleSignIn(request, reply) {
    try {
        const { email } = request.body;
        if (!email || !(0, helpers_1.validateEmail)(email)) {
            throw new helpers_1.ApiError(400, 'Invalid email');
        }
        const user = await helpers_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new helpers_1.ApiError(404, 'User not found');
        }
        const token = (0, auth_1.generateToken)(user.id);
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
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('SignIn error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
async function handleVerifyToken(request, reply) {
    try {
        if (!request.userId) {
            throw new helpers_1.ApiError(401, 'Unauthorized');
        }
        const user = await helpers_1.prisma.user.findUnique({
            where: { id: request.userId },
        });
        if (!user) {
            throw new helpers_1.ApiError(404, 'User not found');
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
    }
    catch (error) {
        if (error instanceof helpers_1.ApiError) {
            return reply.code(error.statusCode).send({ error: error.message });
        }
        console.error('Verify token error:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
}
//# sourceMappingURL=auth.js.map