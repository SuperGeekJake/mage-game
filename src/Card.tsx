import { createMemo, JSX, splitProps, Show } from "solid-js";
import { getCardSuit, getCardValue } from "./game/utils";

const Card = (
  props: {
    cardId?: number;
    winningCard?: boolean;
    hidden?: boolean;
  } & JSX.IntrinsicElements["div"]
) => {
  const [local, other] = splitProps(props, [
    "class",
    "cardId",
    "winningCard",
    "hidden",
  ]);
  const suitID = createMemo(() => local.cardId && getCardSuit(local.cardId));
  return (
    <div
      {...other}
      class={`w-8 h-14 p-1 flex flex-col justify-between rounded-md bg-slate-400 shadow-sm text-xl font-medium leading-none ${local.class}`}
      classList={{
        "ring-2 ring-amber-500": local.winningCard,
        "bg-slate-400": !local.hidden,
        "bg-slate-800": local.hidden,
      }}
    >
      <Show when={!local.hidden && local.cardId !== undefined}>
        <div>{cardValues[getCardValue(local.cardId as number)]}</div>
        <div
          class="text-right"
          classList={{
            "text-black": suitID() === 0 || suitID() === 3,
            "text-red-600": suitID() === 1 || suitID() === 2,
            "text-blue-600": suitID() === 4,
          }}
        >
          {cardSuits[suitID() as number]}
        </div>
      </Show>
    </div>
  );
};

export default Card;

export const cardValues = [
  "E",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
  "W",
];

export const cardSuits = ["♠", "♥", "♦", "♣", "★"];
