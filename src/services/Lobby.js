import {
  generateUniqueID,
  generateRoomNumber
} from 'lib/generator';
import Room from './Room';

export default class Lobby {
  constructor () {
    this.users = [];
    this.rooms = [];
    this._getRoomUniqueID = generateUniqueID;
    this._getRoomNumber = generateRoomNumber;
  }

  getRoom (roomId) {
    return this.rooms.find((room) => room.id === roomId);
  }

  getRoomsInfo () {
    return this.rooms.map((room) => room.getRoomInfo());
  }

  enterLobby (ws) {
    ws.send(JSON.stringify({
      type: 'GET_ROOM_LIST',
      payload: this.getRoomsInfo()
    }));
    this.users = [...this.users, ws];
  }

  leaveLobby (wsId) {
    this.users = this.users.filter((user) => user.id !== wsId);
  }

  createRoom (ws, settings) {
    const newRoom = new Room({
      ...settings,
      id: this._getRoomUniqueID(),
      number: this._getRoomNumber()
    });
    this.rooms = [...this.rooms, newRoom];
    ws.send(JSON.stringify({
      type: 'ROOM_CREATED',
      payload: newRoom.getRoomInfo({ detail: true })
    }));
    this.roomListChanged();
  }

  removeRoom (roomId) {
    this.rooms = this.rooms.filter((room) => room.id !== roomId);
    this.roomListChanged();
  }

  broadcast (data) {
    this.users.forEach((ws) => ws.send(JSON.stringify(data)));
  }

  roomListChanged () {
    this.broadcast({
      type: 'ROOM_LIST_CHANGED',
      payload: this.getRoomsInfo()
    });
  }
}
