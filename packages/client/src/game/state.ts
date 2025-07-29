import { createStore, produce } from "solid-js/store";
import { createUniqueId, createEffect } from "solid-js";

import type { State, PlayerId, CardId, SuitId } from "./types";
import {
  createShuffledDeck,
  getCardValue,
  getWinner,
  nextPlayOrderPos,
} from "./utils";
import { getCurrentTrump, getCurrentPlayer } from "./selectors";

export const createGameStore = () => {
  const playerId = createUniqueId();
  const playerData = {
    id: playerId,
    scores: [],
    hand: [],
  };

  const [state, setState] = createStore<State>({
    phase: "pregame",
    playOrder: [playerId],
    playOrderPos: 0,
    playerId: playerId,
    players: { [playerId]: playerData },
    round: {
      currentHand: 0,
      id: 0,
      hand: [[]],
      trump: [],
    },
  });

  return [
    state,
    {
      startGame: (numPlayers: number) =>
        setState(
          produce((ref) => {
            // Add computer players
            Array.from({ length: numPlayers - 1 }).forEach(() => {
              const newPlayer = createUniqueId();
              ref.playOrder.push(newPlayer);
              ref.players[newPlayer] = {
                id: newPlayer,
                scores: [],
                hand: [],
              };
            });

            ref.phase = "dealing";
          })
        ),
      dealCards: () =>
        setState(
          produce((ref) => {
            const deck = createShuffledDeck();
            for (const player of Object.values(ref.players)) {
              const hand: number[] = [];
              for (let l = -1; l < ref.round.id; l++) {
                const card = deck.shift();
                // Assume there will always be enough cards for players
                hand.push(card as CardId);
              }
              player.hand = hand;
            }

            const trump = deck.shift();
            ref.round.trump = trump !== undefined ? [trump] : [];

            if (trump !== undefined && getCardValue(trump) === 14) {
              ref.phase = "trump";
              return;
            }

            ref.playOrderPos = nextPlayOrderPos(
              ref.playOrder,
              ref.playOrderPos
            );
            ref.phase = "betting";
          })
        ),
      setBet: (playerId: PlayerId, bet: number) =>
        setState(
          produce((ref) => {
            const player = ref.players[playerId];
            player.scores[ref.round.id] = [bet, 0];

            ref.playOrderPos = nextPlayOrderPos(
              ref.playOrder,
              ref.playOrderPos
            );
            const nextPlayerBet =
              ref.players[getCurrentPlayer(ref)].scores[ref.round.id];
            if (nextPlayerBet !== undefined) {
              ref.phase = "playing";
            }
          })
        ),
      playCard: (playerId: PlayerId, cardId: CardId) =>
        setState(
          produce((ref) => {
            const player = ref.players[playerId];
            const index = player.hand.indexOf(cardId);
            const hand = ref.round.hand[ref.round.currentHand];

            hand.push(cardId);
            player.hand.splice(index, 1);

            // If not end of hand
            if (hand.length !== ref.playOrder.length) {
              ref.playOrderPos = nextPlayOrderPos(
                ref.playOrder,
                ref.playOrderPos
              );
              return;
            }

            ref.playOrderPos = -1;
          })
        ),
      decideTrump: (suitId: SuitId) =>
        setState(
          produce((ref) => {
            (ref.round.trump as [number]).push(suitId);
            ref.playOrderPos = nextPlayOrderPos(
              ref.playOrder,
              ref.playOrderPos
            );
            ref.phase = "betting";
          })
        ),
      endHand: () =>
        setState(
          produce((ref) => {
            const trumpSuit = getCurrentTrump(ref);
            const hand = ref.round.hand[ref.round.currentHand];
            const winningIndex = getWinner(hand, trumpSuit);
            debugger;
            const winnerId = ref.playOrder[winningIndex];
            const winner = ref.players[winnerId];
            winner.scores[ref.round.id][1] += 1;

            // If end of phase
            if (!winner.hand.length) {
              // If end of game
              if ((ref.round.id + 1) * ref.playOrder.length > 60) {
                ref.phase = "gameover";
                return;
              }

              // Otherwise handle end of phase
              ref.playOrderPos = nextPlayOrderPos(ref.playOrder, ref.round.id);
              ref.round.id += 1;
              ref.round.trump = [];
              ref.round.currentHand = 0;
              ref.round.hand = [[]];
              ref.phase = "dealing";
              return;
            }

            ref.round.currentHand++;
            ref.round.hand[ref.round.currentHand] = [];
            ref.playOrderPos = winningIndex;
          })
        ),
    },
  ] as const;
};
