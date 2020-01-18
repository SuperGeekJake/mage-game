import { TurnOrder } from "boardgame.io/core";

import * as Card from "./card";
import * as utils from "./utils";

import { Metadata, GameState, Player } from './types/mage';

const deal = {
  turnOrder: {
    ...TurnOrder.ONCE,
    playOrder: (G: GameState, ctx: Metadata) => [G.round.dealer]
  },
  allowedMoves: ["setTrump"],
  next: "bet",
  onPhaseBegin: (G: GameState, ctx: Metadata) => {
    const numCards = G.round.id;
    const deck = ctx.random.Shuffle<number>(utils.createDeck());

    if (ctx.numPlayers * numCards > deck.length) {
      throw new Error("Not enough cards");
    }

    // Deal cards to players
    G.players = utils.reduceMerge<Player>(G.players, () => ({
      hand: deck.splice(0, numCards)
    }));

    // Set trump
    const trump = deck.shift() || null;
    G.round.trump = trump;
  },
  // Run at the start of a turn.
  onTurnBegin: (G: GameState, ctx: Metadata) => {
    // If trump isn't a mage
    if (!G.round.trump || !Card.isMage(G.round.trump as number)) {
      ctx.events.endPhase();
    }
  }
};

const bet = {
  turnOrder: {
    ...TurnOrder.ONCE,
    playOrder: (G: GameState, ctx: Metadata) => {
      const startingPlayer = utils.nextDealer(ctx, G.round.dealer);
      return utils.getPlayerOrder(ctx.numPlayers, startingPlayer);
    }
  },
  allowedMoves: ["placeBet"],
  next: "play"
};

const play = {
  turnOrder: {
    ...TurnOrder.DEFAULT,
    playOrder: (G: GameState, ctx: Metadata) => {
      const startingPlayer =
        ctx.prevPhase === "bet"
          ? utils.nextDealer(ctx, G.round.dealer)
          : (G.round.trick.winner as string);
      return utils.getPlayerOrder(ctx.numPlayers, startingPlayer);
    }
  },
  allowedMoves: ["playCard"],
  endPhaseIf: (G: GameState, ctx: Metadata) => {
    if (ctx.stats.phase.allPlayed) {
      // If final hand completed, move to next round
      const next = G.round.trick.id < G.round.id ? "play" : "deal";
      return { next };
    }
  },
  onPhaseEnd: (G: GameState, ctx: Metadata) => {
    // Decide who won the trick
    // Make winner first in turn order
    const playerId = utils.getWinner(G.round.trump, G.round.trick.cards);
    G.players[playerId].tricks = (G.players[playerId].tricks || 1) + 1;
    G.round.trick = { id: G.round.trick.id + 1, cards: [], winner: playerId };

    if (G.round.trick.id >= G.round.id) {
      const { id, dealer, trump } = G.round;
      const previous = G.data[id - 1];
      // Count up all tricks won
      // Apply updated scores
      G.data[id] = {
        dealer,
        trump,
        col: utils.reduce(G.players, ({ bet, tricks }, id) => {
          const previousScore = previous && previous.col[id].score;
          const score = utils.calcScore(
            bet as number,
            tricks as number,
            previousScore
          );
          return {
            bet,
            tricks,
            score
          };
        })
      };
      // Prepare for new round
      G.round = {
        id: id + 1,
        dealer: utils.nextDealer(ctx, dealer),
        trump: null,
        trick: {
          id: 1,
          cards: [],
          winner: null
        }
      };
    }
  }
};

export default {
  deal,
  bet,
  play
};
