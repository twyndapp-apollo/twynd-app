"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthRoutes = registerAuthRoutes;
const auth_1 = require("../middleware/auth");
const auth_2 = require("../handlers/auth");
const helpers_1 = require("../utils/helpers");
async function registerAuthRoutes(app) {
    // Sign up
    app.post('/auth/signup', async (request, reply) => {
        return (0, auth_2.handleSignUp)(request, reply);
    });
    // Sign in
    app.post('/auth/signin', async (request, reply) => {
        return (0, auth_2.handleSignIn)(request, reply);
    });
    // Verify token
    app.post('/auth/verify', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, auth_2.handleVerifyToken)(request, reply);
    });
    // DELETE /api/auth/account — permanently delete the user and all their data
    app.delete('/auth/account', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        try {
            if (!request.userId)
                throw new helpers_1.ApiError(401, 'Unauthorized');
            // Cascade deletes handle: RoomMember, Subscription, Messages, etc.
            await helpers_1.prisma.user.delete({ where: { id: request.userId } });
            return reply.code(204).send();
        }
        catch (error) {
            if (error instanceof helpers_1.ApiError)
                return reply.code(error.statusCode).send({ error: error.message });
            console.error('Delete account error:', error);
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });
}
//# sourceMappingURL=auth.js.map