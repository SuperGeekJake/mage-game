export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};

export type Metadata = {
  actionPlayers: string[];
  allPlayed: boolean;
  currentPlayer: string;
  currentPlayerMoves: number;
  events: {
    endTurn: () => void;
    endPhase: () => void;
    endGame: () => void;
    setActionPlayers: () => void;
  };
  log: {
    setPayload: (payload: any) => void;
  };
  numPlayers: number;
  phase: string;
  playOrder: string[];
  playOrderPos: number;
  prevPhase: string;
  random: {
    D4: (diceCount: number) => number[];
    D6: (diceCount: number) => number[];
    D8: (diceCount: number) => number[];
    D10: (diceCount: number) => number[];
    D12: (diceCount: number) => number[];
    D20: (diceCount: number) => number[];
    Die: (spotvalue: number, diceCount: number) => number[];
    Number: () => number;
    Shuffle: <T>(arr: T[]) => T[];
  };
  stats: any;
  turn: number;
  gameover?: any;
};

export type CardId = number;
export type PlayerId = string;
export type Trump = CardId | Suite | null;
export type Trick = [PlayerId, number][];
export type Suite = "club" | "diamond" | "heart" | "spade";
export type GameState = {
  data: {
    [roundId: string]: {
      dealer: PlayerId;
      trump: Trump;
      col: {
        [playerId: string]: {
          bet: number;
          tricks: number;
          score: number;
        };
      };
    };
  };
  players: {
    [playerId: string]: {
      hand: CardId[];
      bet: number | null;
      tricks: number | null;
    };
  };
  round: {
    id: number;
    dealer: PlayerId;
    trump: Trump;
    trick: {
      id: number;
      cards: Trick;
      winner: PlayerId | null;
    };
  };
};

export type Players = GameState["players"];
export type Player = GameState["players"]["playerId"];

export type GameProps = {
  G: GameState;
  credentials: object | null;
  ctx: Metadata;
  events: {
    endPhase: () => void;
    endTurn: () => void;
  };
  gameID: string;
  isActive: boolean;
  isConnected: boolean;
  isMultiplayer: boolean;
  log: any[];
  moves: {
    placeBet: () => void;
    playCard: () => void;
    setTrump: () => void;
  };
  playerID: string | null;
  redo: () => void;
  reset: () => void;
  step: () => void;
  undo: () => void;
};
