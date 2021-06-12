export default class Room {
  constructor ({ id, number, name, maxPlayers }) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.currentPlayers = [];
  }

  getRoomInfo () {
    return {
      id: this.id,
      name: this.name,
      number: this.number,
      currentPlayers: this.currentPlayers.length
    };
  }
}
