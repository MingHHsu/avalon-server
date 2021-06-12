import { generateUniqueID } from 'lib/generator';
import { lobbyMessageController } from 'controllers/lobby';

export default function ({ lobbyWss, lobby }) {
  lobbyWss.getUniqueID = generateUniqueID;
  lobbyWss.on('connection', (ws) => {
    ws.id = lobbyWss.getUniqueID();
    ws.on('message', (message) => lobbyMessageController(message, ws, lobby));
  });
};
