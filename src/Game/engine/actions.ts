// import playerActionThunk from './events';
import {
  ActionPlayerCreateGame,
  ActionPlayerJoinGame
} from './types';

export const playerCreateGame = (): ActionPlayerCreateGame =>
  ({ type: 'PLAYER__CREATE_GAME' });

export const playerJoinGame = (): ActionPlayerJoinGame =>
  ({ type: 'PLAYER__JOIN_GAME' });
