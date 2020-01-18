import moves from "./moves";
import phases from "./phases";
import events from "./events";
import * as utils from "./utils";

import { Metadata, GameState } from './types/mage';

export * from './types/mage';
export const config = {
  name: "mage",
  setup: (ctx: Metadata): GameState => ({
    data: {},
    players: utils.initPlayers(ctx),
    round: {
      id: 1,
      dealer: utils.initDealer(ctx),
      trump: null,
      trick: {
        id: 1,
        cards: [],
        winner: null
      }
    }
  }),
  moves,
  flow: {
    movesPerTurn: 1,
    startingPhase: "deal",
    phases,
    ...events
  }
};
