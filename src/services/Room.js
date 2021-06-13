import GameHandler from './GameHandler';

export default class Room {
  constructor ({ id, number, name }) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.players = [];
    this.gameHandler = null;
  }

  getRoomInfo () {
    return {
      id: this.id,
      name: this.name,
      number: this.number,
      players: this.players.length
    };
  }

  getRoomDetail () {
    return {
      id: this.id,
      name: this.name,
      number: this.number,
      players: this._getPlayersInfo()
    };
  }

  _getPlayersInfo () {
    return this.players.map((ws) => ({
      name: ws.name
    }));
  }

  playerJoin (ws) {
    this.players = [...this.players, ws];
    this.playersChanged();
  }

  playerLeave (wsId) {
    this.players = this.players.filter((ws) => ws.id !== wsId);
    this.playersChanged();
  }

  broadcast (data) {
    this.players.forEach((ws) => ws.send(JSON.stringify(data)));
  }

  playersChanged () {
    this.broadcast({
      type: 'PLAYERS_CHANGED',
      payload: this.getRoomDetail()
    });
  }
}
