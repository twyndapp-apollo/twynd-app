"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/index.ts
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
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
        }, { prefix: '/api' });
        // WebSocket endpoint for real-time messages
        app.get('/ws', { websocket: true }, (socket) => {
            console.log('New WebSocket connection');
            socket.on('message', (msg) => {
                try {
                    const data = JSON.parse(msg);
                    console.log('Received:', data);
                    // Broadcast to all connected clients (in production, use a more sophisticated approach)
                    socket.send(JSON.stringify({ ack: true, received: data }));
                }
                catch (error) {
                    console.error('WebSocket message error:', error);
                    socket.send(JSON.stringify({ error: 'Invalid message format' }));
                }
            });
            socket.on('error', (error) => {
                console.error('WebSocket error:', error);
            });
            socket.on('close', () => {
                console.log('WebSocket connection closed');
            });
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