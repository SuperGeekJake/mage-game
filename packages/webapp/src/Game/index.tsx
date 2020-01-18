import * as React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { config as mage } from '@mage/engine/src';

function GameUI() {
  return <div>Game UI</div>;
}

export default Client({
  game: mage,
  board: GameUI,
  multiplayer: SocketIO(),
});
