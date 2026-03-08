// server/src/index.ts
import Fastify from 'fastify';
import fastifyWebSocket from '@fastify/websocket';
import fastifyCors from '@fastify/cors';

const app = Fastify({ logger: true });

await app.register(fastifyCors, { origin: '*' });
await app.register(fastifyWebSocket);

// Health check — test this first
app.get('/health', async () => ({ status: 'ok', ts: Date.now() }));

// WebSocket endpoint
app.get('/ws', { websocket: true }, (socket) => {
  socket.on('message', (msg: string) => {
    console.log('received:', msg);
    socket.send(JSON.stringify({ ack: true }));
  });
});

await app.listen({ port: 3000, host: '0.0.0.0' });
console.log('Server running on :3000');