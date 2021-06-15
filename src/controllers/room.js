export function onMessage (message, ws, lobby) {
  const data = JSON.parse(message);
  switch (data.type) {
    case 'ENTER_ROOM': {
      const { id } = data.payload;
      ws.room = lobby.getRoom(id);
      if (ws.room) {
        ws.room.playerJoin(ws);
        lobby.roomListChanged();
      } else {
        ws.send(JSON.stringify({ type: 'ROOM_NOT_FOUND', payload: '房間不存在' }));
        ws.close();
      }
      break;
    }
    default:
      break;
  }
}

export function onClose (ws, lobby) {
  ws.room?.playerLeave(ws.id);
  ws.room?.players.length === 0 && lobby.removeRoom(ws.room.id);
}
