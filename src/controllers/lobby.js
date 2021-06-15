export function onMessage (message, ws, lobby) {
  const data = JSON.parse(message);
  switch (data.type) {
    case 'ENTER_LOBBY': {
      lobby.enterLobby(ws);
      break;
    }
    case 'CREATE_ROOM': {
      const { setting } = data.payload;
      lobby.createRoom(ws, setting);
      break;
    }
    case 'JOIN_ROOM': {
      const { roomId } = data.payload;
      lobby.joinRoom(ws, roomId);
      break;
    }
  }
}
