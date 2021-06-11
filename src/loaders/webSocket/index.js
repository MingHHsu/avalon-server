import WebSocket from 'ws';

export default async function ({ server }) {
  const lobbyWss = new WebSocket.Server({ noServer: true });
  await require('./lobby').default({ lobbyWss });
  const roomWss = new WebSocket.Server({ noServer: true });
  await require('./room').default({ roomWss });
  const gameWss = new WebSocket.Server({ noServer: true });
  await require('./game').default({ gameWss });

  server.on('upgrade', (request, socket, head) => {
    const { url } = request;
    switch (url) {
      case '/lobby': {
        lobbyWss.handleUpgrade(request, socket, head, (ws) => {
          lobbyWss.emit('connection', ws, request);
        });
        break;
      }
      case '/room': {
        roomWss.handleUpgrade(request, socket, head, (ws) => {
          roomWss.emit('connection', ws, request);
        });
        break;
      }
      case '/game': {
        gameWss.handleUpgrade(request, socket, head, (ws) => {
          gameWss.emit('connection', ws, request);
        });
        break;
      }
      default: {
        socket.destroy();
        break;
      }
    }
  });
};
