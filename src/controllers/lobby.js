export function lobbyMessageController (message, ws, lobby) {
  const data = JSON.parse(message);
  switch (data.type) {
    case 'ENTER_LOBBY': {
      const { name } = data.payload;
      ws.name = name;
      lobby.enterLobby(ws);
      break;
    }
    case 'LEAVE_LOBBY': {
      lobby.leaveLobby(ws.id);
      break;
    }
    case 'CREATE_ROOM': {
      const { setting } = data.payload;
      lobby.createRoom(setting);
      break;
    }
    case 'REMOVE_ROOM': {
      const { roomId } = data.payload;
      lobby.removeRoom(roomId);
      break;
    }
    case 'JOIN_ROOM': {
      const { roomId } = data.payload;
      lobby.joinRoom(roomId, ws);
      break;
    }
  }
}
