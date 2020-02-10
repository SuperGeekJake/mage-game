import { Action as ReduxAction } from 'redux';

export type CardID = number;
export type GameID = string;
export type Phase = 'lobby' | 'deal' | 'bet' | 'trick' | 'over';
export type PlayerID = string;
export type PlayOrderIndex = number;
export type Suite = 'club' | 'diamond' | 'heart' | 'spade';
export type Trump = CardID | Suite | null;

export interface PlayerState {
  bet: number | null;
  hand: CardID[];
  id: PlayerID;
  score: number;
  tricks: number;
}

export interface Round {
  dealer: PlayerID | null;
  id: number;
  trump: Trump;
}

export interface Trick {
  cards: [PlayerID, CardID][]
  id: number;
  startingPlayer: PlayerID | null;
}

export interface State {
  readonly gameID: GameID;
  readonly playerID: PlayerID;
  readonly currentPlayer: PlayerID | null;
  readonly phase: Phase;
  readonly players: Map<PlayerID, PlayerState>;
  readonly playOrder: PlayerID[];
  readonly playOrderPos: PlayOrderIndex;
  readonly round: Round;
  readonly trick: Trick;
}

export interface ActionPlayerCreateGame extends ReduxAction<'PLAYER__CREATE_GAME'> {}
export interface ActionPlayerJoinGame extends ReduxAction<'PLAYER__JOIN_GAME'> {}
export interface ActionPlayerSetTrump extends ReduxAction<'PLAYER__SET_TRUMP'> {
  payload: Suite;
}
export interface ActionPlayerSetBet extends ReduxAction<'PLAYER__SET_BET'> {
  payload: number;
}
export interface ActionPlayerPlayCard extends ReduxAction<'PLAYER__PLAY_CARD'> {
  payload: CardID;
}

export type Action =
  ActionPlayerCreateGame
  | ActionPlayerJoinGame
  | ActionPlayerSetTrump
  | ActionPlayerSetBet
  | ActionPlayerPlayCard;
