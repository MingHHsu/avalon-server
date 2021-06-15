import { generateUniqueID } from 'lib/generator';
import { onMessage } from 'controllers/lobby';

export default function ({ lobbyWss, lobby }) {
  lobbyWss.getUniqueID = generateUniqueID;
  lobbyWss.on('connection', (ws) => {
    ws.id = lobbyWss.getUniqueID();
    ws.on('message', (message) => onMessage(message, ws, lobby));
    ws.on('close', () => lobby.leaveLobby(ws.id));
  });
};
