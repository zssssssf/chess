
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import { appRouter } from './trpc';

const PORT = Number(process.env.PORT ?? 8080);

// Single HTTP server hosts both the tRPC API (/trpc) and the WebSocket game server.
const server = createHTTPServer({ router: appRouter, basePath: '/trpc/' });
const wss = new WebSocketServer({ server });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
  gameManager.addUser(ws)
  ws.on('close', () => gameManager.removeUser(ws))
});

server.listen(PORT, () => {
  console.log(`HTTP/tRPC + WebSocket server listening on port ${PORT}`);
});
