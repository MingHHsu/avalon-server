import WebSocket from 'ws';
import Lobby from 'services/Lobby';

export default async function ({ server }) {
  const lobby = new Lobby();
  const lobbyWss = new WebSocket.Server({ noServer: true });
  await require('./lobby').default({ lobbyWss, lobby });
  const roomWss = new WebSocket.Server({ noServer: true });
  await require('./room').default({ roomWss });

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
      default: {
        socket.destroy();
        break;
      }
    }
  });
};
