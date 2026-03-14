"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/index.ts
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const websocket_1 = __importDefault(require("@fastify/websocket"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
console.log('🔧 Starting server initialization...');
// Import route handlers
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
const room_1 = require("./routes/room");
const chat_1 = require("./routes/chat");
const games_1 = require("./routes/games");
const vibes_1 = require("./routes/vibes");
const us_1 = require("./routes/us");
const subscription_1 = require("./routes/subscription");
console.log('📦 Routes imported');
async function main() {
    try {
        console.log('🚀 Creating Fastify app');
        const app = (0, fastify_1.default)({ logger: true });
        console.log('📝 Registering plugins');
        // Register plugins
        await app.register(helmet_1.default);
        await app.register(cors_1.default, { origin: '*' });
        await app.register(websocket_1.default);
        // Health check — test this first
        app.get('/health', async () => ({ status: 'ok', timestamp: Date.now() }));
        console.log('🛣️ Registering routes');
        // Register routes with /api prefix
        await app.register(async (app) => {
            await (0, auth_1.registerAuthRoutes)(app);
            await (0, user_1.registerUserRoutes)(app);
            await (0, room_1.registerRoomRoutes)(app);
            await (0, chat_1.registerChatRoutes)(app);
            await (0, games_1.registerGameRoutes)(app);
            await (0, vibes_1.registerVibesRoutes)(app);
            await (0, us_1.registerUsRoutes)(app);
            await (0, subscription_1.registerSubscriptionRoutes)(app);
        }, { prefix: '/api' });
        // ── WebSocket — room-scoped message routing ─────────────────────────────
        // Connect with: ws://<host>/ws?token=<JWT>&roomId=<roomId>
        // Supported message types (client → server → partner):
        //   profile_sync    — full profile snapshot (sent on connect by lead)
        //   status_update   — { statusEmoji, statusMessage }
        //   location_update — { locationCity, distanceKm }
        //   profile_update  — partial profile card changes
        // roomId → Set of authenticated sockets in that room
        const rooms = new Map();
        app.get('/ws', { websocket: true }, (socket, request) => {
            const url = new URL(request.url, `http://localhost`);
            const token = url.searchParams.get('token') ?? '';
            const roomId = url.searchParams.get('roomId') ?? '';
            // Verify JWT
            let userId;
            try {
                const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET ?? '');
                userId = payload.userId;
            }
            catch {
                socket.send(JSON.stringify({ error: 'Unauthorized' }));
                socket.close();
                return;
            }
            // Register socket in room
            if (!rooms.has(roomId))
                rooms.set(roomId, new Set());
            const entry = { userId, socket };
            rooms.get(roomId).add(entry);
            console.log(`WS: user ${userId} joined room ${roomId}`);
            socket.on('message', (msg) => {
                try {
                    const data = JSON.parse(msg.toString());
                    // Forward to the other participant in the same room
                    const roomSockets = rooms.get(roomId);
                    if (roomSockets) {
                        for (const peer of roomSockets) {
                            if (peer.userId !== userId) {
                                peer.socket.send(JSON.stringify({ ...data, senderId: userId }));
                            }
                        }
                    }
                }
                catch {
                    socket.send(JSON.stringify({ error: 'Invalid message format' }));
                }
            });
            socket.on('close', () => {
                rooms.get(roomId)?.delete(entry);
                if (rooms.get(roomId)?.size === 0)
                    rooms.delete(roomId);
                console.log(`WS: user ${userId} left room ${roomId}`);
            });
            socket.on('error', (err) => console.error('WS error:', err));
        });
        // Start server
        const port = parseInt(process.env.PORT || '3000');
        const host = process.env.HOST || '0.0.0.0';
        console.log(`⏳ Attempting to listen on ${host}:${port}`);
        await app.listen({ port, host });
        console.log(`✅ Server running on ${host}:${port}`);
    }
    catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}
console.log('📌 Calling main()....');
main().catch((err) => {
    console.error('❌ Unhandled error in main:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map