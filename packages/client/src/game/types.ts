export type CardId = number;
export type SuitId = number;
export type PlayerId = string;
export type Bet = number;
export type Score = number;

export interface Player {
  id: PlayerId;
  hand: CardId[];
  scores: [Bet, Score][];
}

export interface Round {
  currentHand: number;
  id: number;
  trump: [] | [CardId] | [CardId, SuitId];
  hand: CardId[][];
}

export interface State {
  gameover?: PlayerId | PlayerId[];
  phase: "pregame" | "dealing" | "trump" | "betting" | "playing" | "gameover";
  playOrder: PlayerId[];
  playOrderPos: number;
  playerId: PlayerId;
  players: Record<PlayerId, Player>;
  round: Round;
}
