"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserRoutes = registerUserRoutes;
const auth_1 = require("../middleware/auth");
const user_1 = require("../handlers/user");
async function registerUserRoutes(app) {
    // Get profile
    app.get('/users/profile', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, user_1.handleGetProfile)(request, reply);
    });
    // Update profile
    app.patch('/users/profile', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, user_1.handleUpdateProfile)(request, reply);
    });
    // Update status
    app.patch('/users/status', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, user_1.handleUpdateStatus)(request, reply);
    });
}
//# sourceMappingURL=user.js.map