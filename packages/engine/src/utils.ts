import _ from "lodash";
import * as Card from "./card";

import { Metadata, Players, PlayerId, DeepPartial, Trump, Trick } from './types/mage';

export const createDeck = () => Array.from(Array(60), (x, i) => i);

export const getRandomIndex = (random: () => number, listLength: number) =>
  Math.floor(random() * listLength);

export const withoutBy = (arr: any[], index: number) =>
  arr.slice(0, index).concat(arr.slice(index, 1));
export const getPlayerIndex = (id: string) => Number.parseInt(id, 10);

export const initPlayer = {
  hand: [],
  bet: null,
  tricks: null
};

export const initPlayers = (ctx: Metadata) =>
  getPlayerOrder(ctx.numPlayers).reduce(
    (result: Players, id: string) => ({ ...result, [id]: initPlayer }),
    {}
  );

export const initDealer = (ctx: Metadata) =>
  getRandomIndex(ctx.random.Number, ctx.numPlayers).toString();

export const calcScore = (bet: number, tricks: number, score: number = 0) => {
  const earned = bet === tricks ? bet * 10 + 20 : Math.abs(bet - tricks) * -10;

  return score + earned;
};

export const nextDealer = (ctx: Metadata, dealer: PlayerId) =>
  ((getPlayerIndex(dealer) + 1) % ctx.numPlayers).toString();

export const reduce = <T>(
  collection: { [key: string]: any },
  callback: (value: any, key: string, collection: { [key: string]: any }) => T
) =>
  _.reduce(
    collection,
    (
      accumulator: { [key: string]: T },
      value: any,
      key: string,
      collection: { [key: string]: any }
    ) => ({
      ...accumulator,
      [key]: callback(value, key, collection)
    }),
    {}
  );

export const reduceMerge = <T>(
  collection: { [key: string]: T },
  callback: (
    value: T,
    key: string,
    collection: { [key: string]: T }
  ) => DeepPartial<T>
) =>
  _.reduce(
    collection,
    (
      accumulator: { [key: string]: T },
      value: T,
      key: string,
      collection: { [key: string]: T }
    ) => ({
      ...accumulator,
      [key]: _.merge(value, callback(value, key, collection))
    }),
    {}
  );

export const getWinner = (trump: Trump, trick: Trick): PlayerId => {
  let winner = trick[0];
  for (let i = 0; i < trick.length; i++) {
    const currentCard = trick[i][1];
    const winnerCard = winner[1];

    // If the currentCard is a Mage
    if (Card.isMage(currentCard)) {
      winner = trick[i];
      break; // Instant winner, no need to check other cards
    }

    // Jesters can't win (except for the first played with only jesters played after)
    if (!Card.isJester(currentCard)) {
      // If the winnerCard is not trump and the currentCard is trump
      const isFirstTrump =
        !Card.isTrump(winnerCard, trump) && Card.isTrump(currentCard, trump);
      // If the currentCard is same suite as winnerCard and currentCard is higher
      const isHigherRank =
        Card.getSuite(currentCard) === Card.getSuite(winnerCard) &&
        Card.getValue(currentCard) > Card.getValue(winnerCard);
      if (isFirstTrump || isHigherRank) {
        winner = trick[i];
      }
    }
  }

  return winner[0];
};

const rotate = (arr: any[], index: number) => {
  if (index === 0) return arr;
  return arr.slice(index).concat(arr.slice(0, index));
};
const getIndexArr = (length: number) => Array.from(Array(length), (__, i) => i);
const getStringIndexArr = (length: number) =>
  getIndexArr(length).map(x => x.toString());
export const getPlayerOrder = (
  numPlayers: number,
  startingPlayer: string = "0"
) => rotate(getStringIndexArr(numPlayers), getPlayerIndex(startingPlayer));
