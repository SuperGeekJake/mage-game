import _ from "lodash";

import { Metadata, GameState, DeepPartial } from './types/mage';

export const factory = {
  ctx: (partial: DeepPartial<Metadata> = {}): Metadata =>
    _.merge(
      {
        actionPlayers: ["0"],
        allPlayed: false,
        currentPlayer: "0",
        currentPlayerMoves: 0,
        events: {
          endTurn: () => {},
          endPhase: () => {},
          endGame: () => {},
          setActionPlayers: () => {}
        },
        log: {
          setPayload: () => {}
        },
        numPlayers: 3,
        phase: "deal",
        playOrder: ["0", "1", "2"],
        playOrderPos: 0,
        prevPhase: "default",
        random: {
          D4: () => [1],
          D6: () => [1],
          D8: () => [1],
          D10: () => [1],
          D12: () => [1],
          D20: () => [1],
          Die: () => [1],
          Number: () => 1,
          Shuffle: (arr: any[]) => arr
        },
        stats: {},
        turn: 0
      },
      partial
    ),
  state: (partial: DeepPartial<GameState> = {}): GameState =>
    _.merge(
      {
        data: {},
        players: {
          "0": {
            hand: [],
            bet: null,
            tricks: null
          },
          "1": {
            hand: [],
            bet: null,
            tricks: null
          },
          "2": {
            hand: [],
            bet: null,
            tricks: null
          }
        },
        round: {
          id: 0,
          dealer: "0",
          trump: null,
          trick: {
            id: 0,
            cards: [],
            winner: null
          }
        }
      },
      partial
    )
};
