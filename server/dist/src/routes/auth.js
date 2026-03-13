"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthRoutes = registerAuthRoutes;
const auth_1 = require("../middleware/auth");
const auth_2 = require("../handlers/auth");
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
}
//# sourceMappingURL=auth.js.map