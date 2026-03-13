"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoomRoutes = registerRoomRoutes;
const auth_1 = require("../middleware/auth");
const room_1 = require("../handlers/room");
async function registerRoomRoutes(app) {
    // Create room
    app.post('/rooms', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleCreateRoom)(request, reply);
    });
    // Get room
    app.get('/rooms/:roomId', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleGetRoom)(request, reply);
    });
    // Join room
    app.post('/rooms/join', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleJoinRoom)(request, reply);
    });
    // Get QR code
    app.get('/rooms/:roomId/qrcode', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleGetQRCode)(request, reply);
    });
    // Accept connection
    app.post('/rooms/accept-connection', { preHandler: auth_1.authenticateToken }, async (request, reply) => {
        return (0, room_1.handleAcceptConnection)(request, reply);
    });
}
//# sourceMappingURL=room.js.map