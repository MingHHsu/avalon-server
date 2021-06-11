import getUniqueID from 'lib/getUniqueID';

export default function ({ gameWss }) {
  gameWss.getUniqueID = getUniqueID;
  gameWss.on('connection', (ws) => {
    ws.id = gameWss.getUniqueID();
    console.log(`game: ${ws.id} is connected!`);
    ws.send({ type: 'game connection success' });
    ws.on('message', (message) => {
      console.log('received: %s', message);
    });
  });
};
