import type { CardId, State } from "./types";

export const getCardValue = (cardId: number) => cardId % 15;
export const getCardSuit = (cardId: number) =>
  cardId % 15 === 0 || cardId % 15 === 14 ? 4 : Math.floor(cardId / 15);

export const getCardDetails = (cardID: number) => [
  getCardValue(cardID),
  getCardSuit(cardID),
];

export const getWinner = (cards: number[], trumpSuit?: number) => {
  let winner = 0;
  for (let i = 0; i < cards.length; i++) {
    const [value, suit] = getCardDetails(cards[i]);
    const [winningValue, winningSuit] = getCardDetails(cards[winner]);

    // If wizard, return index
    if (value === 14) return i;

    // If first card assume victory for now
    if (i === 0) continue;

    // If card played is Jester, assume loss
    if (value === 0) continue;

    // If not same suit, but card is trump suit
    if (suit !== winningSuit && suit === trumpSuit) {
      winner = i;
    }

    // If same suit and is higher card
    if (suit === winningSuit && value > winningValue) {
      winner = i;
    }
  }

  return winner;
};

export const getValidCards = (current: number[], player: number[]) => {
  // Find declared suit
  const requiredSuit = getRequiredSuit(current);
  // No required suit declared, allow all cards
  if (!requiredSuit) return player;

  const sameSuitCards = player.filter(
    (card) => getCardSuit(card) === requiredSuit
  );
  // Doesn't have same suit, can play anything
  if (sameSuitCards.length === 0) return player;

  // Otherwise allow Blue cards and same suit cards
  return [
    ...sameSuitCards,
    ...player.filter((card) => getCardSuit(card) === 4),
  ];
};

const getRequiredSuit = (play: CardId[]) => {
  if (play.length === 0 || getCardValue(play[0]) === 14) return;
  for (const card of play) {
    const currentSuit = getCardSuit(card);
    if (currentSuit === 4) continue;
    return currentSuit;
  }
};

export const dealCard = (deck: CardId[]) => {
  if (deck.length === 0) return;

  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return card;
};

export const createShuffledDeck = () => {
  const deck = Array.from({ length: 60 }, (_, i) => i);
  let count = deck.length;
  while (count) {
    const randomIndex = Math.floor(Math.random() * count);
    deck.push(deck.splice(randomIndex, 1)[0]);
    count -= 1;
  }

  return deck;
};

export const nextPlayOrderPos = (playOrder: any[], playOrderPos: number) =>
  (playOrderPos + 1) % playOrder.length;

/**
 * Should return a number between 0 and 1 being the percentage probability of victory
 */
export const getWinProbability = (state: State, cardId: CardId): number => {
  const hand = [...state.round.hand[state.round.currentHand], cardId];
  // If card wins hand or not
  const isWinner = getWinner(hand) === hand.length - 1;
  // If losing, then return a zero chance
  if (!isWinner) return 0;
  // If is last card played or card played is Wizard, then return a 100 percent chance
  if (getCardValue(cardId) === 14 || state.playOrder.length === hand.length)
    return 1;

  const knownCards = [...state.round.hand.flat(), state.round.trump[0], cardId];
  const possibles = Array.from({ length: 60 }, (_, i) => i).filter(
    (cid) => !knownCards.includes(cid)
  );
  // Decipher trump suit, if any
  const trumpSuit =
    state.round.trump[1] ??
    (state.round.trump[0] && getCardSuit(state.round.trump[0]));
  const betterCards = possibles.filter((cid) => {
    const possibleHand = [...hand, cid];
    return getWinner(possibleHand, trumpSuit) === possibleHand.length - 1;
  });

  return (possibles.length - betterCards.length) / possibles.length;
};
