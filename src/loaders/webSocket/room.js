import { generateUniqueID } from 'lib/generator';
import { roomMessageController } from 'controllers/room';

let index = 1;

export default function ({ roomWss, lobby }) {
  roomWss.getUniqueID = generateUniqueID;
  roomWss.on('connection', (ws) => {
    ws.id = roomWss.getUniqueID();
    ws.name = `player ${index}`;
    ws.on('message', (message) => roomMessageController(message, ws, lobby));
    ws.on('close', () => ws.room.playerLeave(ws.id));
    index++;
  });
};
