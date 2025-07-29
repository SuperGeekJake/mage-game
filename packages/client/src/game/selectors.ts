import type { State } from "./types";
import { getCardSuit, getWinner } from "./utils";

export const getCurrentPlayer = (state: State) =>
  state.playOrder[state.playOrderPos];

export const getCurrentTrump = (state: State) => {
  const [trumpCard, chosenSuit] = state.round.trump;
  return chosenSuit ?? (trumpCard && getCardSuit(trumpCard));
};

export const getCurrentTrumpCard = (state: State) => state.round.trump[0];

export const getCurrentWinningCard = (state: State) => {
  const hand = state.round.hand[state.round.currentHand];
  const trump = getCurrentTrump(state);
  if (!hand.length || !trump) return;
  return getWinner(hand, trump);
};

export const getNumPlayers = (state: State) => state.playOrder.length;
