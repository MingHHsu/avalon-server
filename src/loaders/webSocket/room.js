import getUniqueID from 'lib/getUniqueID';

export default function ({ roomWss }) {
  roomWss.getUniqueID = getUniqueID;
  roomWss.on('connection', (ws) => {
    ws.id = roomWss.getUniqueID();
    console.log(`room: ${ws.id} is connected!`);
    roomWss.clients.forEach(client => console.log(client.id));
    ws.send(JSON.stringify({ type: 'room connection success' }));
    ws.on('message', (message) => {
      console.log('received: %s', message);
    });
  });
};
