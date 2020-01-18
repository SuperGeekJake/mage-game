import { INVALID_MOVE } from "boardgame.io/core";
import { suiteMap } from "./card";

import { Metadata, GameState, Suite } from './types/mage';

// Only for dealer when the trump card is a Mage
const setTrump = (G: GameState, ctx: Metadata, suite: Suite) => {
  if (typeof suite !== "string" || !suiteMap.includes(suite))
    return INVALID_MOVE;
  G.round.trump = suite;
};

// On your turn only
// During playing phase
const playCard = (
  G: GameState,
  { currentPlayer }: Metadata,
  handIndex: number
) => {
  if (typeof handIndex !== "number") return INVALID_MOVE;
  const cardId = G.players[currentPlayer].hand[handIndex];
  if (typeof cardId !== "number") return INVALID_MOVE;

  G.round.trick.cards.push([currentPlayer, cardId]);
  G.players[currentPlayer].hand.splice(handIndex, 1);
};

// On your turn only
// During betting phase
const placeBet = (G: GameState, { currentPlayer }: Metadata, bet: number) => {
  if (!Number.isInteger(bet) || bet < 0 || bet > G.round.id)
    return INVALID_MOVE;

  G.players[currentPlayer].tricks = 0;
  G.players[currentPlayer].bet = bet;
};

export default {
  setTrump,
  playCard,
  placeBet
};
