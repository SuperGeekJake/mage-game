import { CardId, Trump } from './types/mage';

export const suiteMap = ["spell", "club", "diamond", "heart", "spade"];

export const rankMap = [
  "jester",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "ace",
  "mage"
];

export const getValue = (id: CardId) => id % 15;
export const getRank = (id: CardId) => rankMap[getValue(id)];
export const isMage = (id: CardId) => getValue(id) === 14;
export const isJester = (id: CardId) => getValue(id) === 0;
export const getSuite = (id: CardId) =>
  isMage(id) || isJester(id) ? suiteMap[0] : suiteMap[Math.ceil(id / 15)];
export const isTrump = (id: CardId, trump: Trump) => {
  let suite = typeof trump === "number" ? getSuite(trump) : trump;
  // If trump is a jester, treat as no trump
  if (suite === "spell") suite = null;
  return suite === getSuite(id);
};
