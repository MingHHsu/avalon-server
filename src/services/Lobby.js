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
    this.users = this.users.map((user) => user.id !== wsId);
  }

  createRoom (settings) {
    const newRoom = new Room({
      ...settings,
      id: this._getRoomUniqueID(),
      number: this._getRoomNumber()
    });
    this.rooms = [...this.rooms, newRoom];
    this.broadcast({
      type: 'ROOM_LIST_CHANGED',
      payload: this.getRoomsInfo()
    });
  }

  removeRoom (roomId) {
    this.rooms = this.rooms.map((room) => room.id !== roomId);
    this.broadcast({
      type: 'ROOM_LIST_CHANGED',
      payload: this.getRoomsInfo()
    });
  }

  broadcast (data) {
    this.users.forEach((ws) => ws.send(JSON.stringify(data)));
  }
}
