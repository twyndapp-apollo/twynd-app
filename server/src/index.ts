// server/src/index.ts
import 'dotenv/config';
import Fastify from 'fastify';
import jwt from 'jsonwebtoken';
import fastifyWebSocket from '@fastify/websocket';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';

console.log('🔧 Starting server initialization...');

// Import route handlers
import { registerAuthRoutes } from './routes/auth';
import { registerUserRoutes } from './routes/user';
import { registerRoomRoutes } from './routes/room';
import { registerChatRoutes } from './routes/chat';
import { registerGameRoutes } from './routes/games';
import { registerVibesRoutes } from './routes/vibes';
import { registerUsRoutes } from './routes/us';
import { registerSubscriptionRoutes } from './routes/subscription';

console.log('📦 Routes imported');

async function main() {
  try {
    console.log('🚀 Creating Fastify app');
    const app = Fastify({ logger: true });

    console.log('📝 Registering plugins');
    // Register plugins
    await app.register(fastifyHelmet);
    await app.register(fastifyCors, { origin: '*' });
    await app.register(fastifyWebSocket);

    // Health check — test this first
    app.get('/health', async () => ({ status: 'ok', timestamp: Date.now() }));

    console.log('🛣️ Registering routes');
    // Register routes with /api prefix
    await app.register(async (app) => {
      await registerAuthRoutes(app);
      await registerUserRoutes(app);
      await registerRoomRoutes(app);
      await registerChatRoutes(app);
      await registerGameRoutes(app);
      await registerVibesRoutes(app);
      await registerUsRoutes(app);
      await registerSubscriptionRoutes(app);
    }, { prefix: '/api' });

    // ── WebSocket — room-scoped message routing ─────────────────────────────
    // Connect with: ws://<host>/ws?token=<JWT>&roomId=<roomId>
    // Supported message types (client → server → partner):
    //   profile_sync    — full profile snapshot (sent on connect by lead)
    //   status_update   — { statusEmoji, statusMessage }
    //   location_update — { locationCity, distanceKm }
    //   profile_update  — partial profile card changes

    // roomId → Set of authenticated sockets in that room
    const rooms = new Map<string, Set<{ userId: string; socket: any }>>();

    app.get('/ws', { websocket: true }, (socket, request) => {
        const url   = new URL(request.url, `http://localhost`);
        const token  = url.searchParams.get('token') ?? '';
        const roomId = url.searchParams.get('roomId') ?? '';

        // Verify JWT
        let userId: string;
        try {
          const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? '') as { userId: string };
          userId = payload.userId;
        } catch {
          socket.send(JSON.stringify({ error: 'Unauthorized' }));
          socket.close();
          return;
        }

        // Register socket in room
        if (!rooms.has(roomId)) rooms.set(roomId, new Set());
        const entry = { userId, socket };
        rooms.get(roomId)!.add(entry);
        console.log(`WS: user ${userId} joined room ${roomId}`);

        socket.on('message', (msg: string) => {
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
          } catch {
            socket.send(JSON.stringify({ error: 'Invalid message format' }));
          }
        });

        socket.on('close', () => {
          rooms.get(roomId)?.delete(entry);
          if (rooms.get(roomId)?.size === 0) rooms.delete(roomId);
          console.log(`WS: user ${userId} left room ${roomId}`);
        });

        socket.on('error', (err: Error) => console.error('WS error:', err));
      });

    // Start server
    const port = parseInt(process.env.PORT || '3000');
    const host = process.env.HOST || '0.0.0.0';

    console.log(`⏳ Attempting to listen on ${host}:${port}`);
    await app.listen({ port, host });
    console.log(`✅ Server running on ${host}:${port}`);
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

console.log('📌 Calling main()....');
main().catch((err) => {
  console.error('❌ Unhandled error in main:', err);
  process.exit(1);
});