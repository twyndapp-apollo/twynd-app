// server/src/index.ts
import Fastify from 'fastify';
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
    // Register routes
    await registerAuthRoutes(app);
    await registerUserRoutes(app);
    await registerRoomRoutes(app);
    await registerChatRoutes(app);
    await registerGameRoutes(app);

    // WebSocket endpoint for real-time messages
    app.get('/ws', { websocket: true }, (socket) => {
      console.log('New WebSocket connection');

      socket.on('message', (msg: string) => {
        try {
          const data = JSON.parse(msg);
          console.log('Received:', data);

          // Broadcast to all connected clients (in production, use a more sophisticated approach)
          socket.send(JSON.stringify({ ack: true, received: data }));
        } catch (error) {
          console.error('WebSocket message error:', error);
          socket.send(JSON.stringify({ error: 'Invalid message format' }));
        }
      });

      socket.on('error', (error: Error) => {
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