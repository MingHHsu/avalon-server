import getUniqueID from 'lib/getUniqueID';

export default function ({ lobbyWss }) {
  lobbyWss.getUniqueID = getUniqueID;
  lobbyWss.on('connection', (ws) => {
    ws.id = lobbyWss.getUniqueID();
    console.log(`lobby: ${ws.id} is connected!`);
    lobbyWss.clients.forEach(client => console.log(client.id));
    ws.send(JSON.stringify({ type: 'lobby connection success' }));
    ws.on('message', (message) => {
      console.log('received: %s', message);
    });
  });
};
