import { generateUniqueID } from 'lib/generator';
import { onMessage, onClose } from 'controllers/room';

let index = 1;

export default function ({ roomWss, lobby }) {
  roomWss.getUniqueID = generateUniqueID;
  roomWss.on('connection', (ws) => {
    ws.id = roomWss.getUniqueID();
    ws.name = `player ${index}`;
    ws.on('message', (message) => onMessage(message, ws, lobby));
    ws.on('close', () => onClose(ws, lobby));
    index++;
  });
};
