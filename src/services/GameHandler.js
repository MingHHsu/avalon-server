import { EventEmitter } from 'events';

export default class GameHandler extends EventEmitter {
  constructor () {
    super();
    this.leader = null;
  }

  setUp ({
    leader
  }) {
    this.leader = leader;
  }
}
