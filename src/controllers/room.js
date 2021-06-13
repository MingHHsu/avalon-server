export function roomMessageController (message, ws, lobby) {
  const data = JSON.parse(message);
  switch (data.type) {
    case 'ENTER_ROOM': {
      const { id } = data.payload;
      ws.room = lobby.getRoom(id);
      if (ws.room) {
        ws.room.playerJoin(ws);
        lobby.roomListChanged();
      } else {
        ws.send(JSON.stringify({ type: 'WEBSOCKET_ERROR', payload: '房間不存在' }));
        ws.close();
      }
      break;
    }
    case 'LEAVE_ROOM': {
      if (ws.room) {
        ws.room.playerLeave(ws);
        lobby.roomListChanged();
      }
      ws.close();
      break;
    }
    default:
      break;
  }
}
