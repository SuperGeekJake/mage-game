import {
  Component,
  For,
  Show,
  Switch,
  Match,
  createMemo,
  createSignal,
} from "solid-js";

import {
  createGameStore,
  getCurrentTrumpCard,
  getCurrentWinningCard,
  getCurrentPlayer,
  getValidCards,
  Player,
  CardId,
} from "./game";
import Card, { cardSuits } from "./Card";

const App: Component = () => {
  let playerInput: HTMLInputElement | undefined;
  const [playerInputValue, setPlayerInputValue] = createSignal(6);

  let betInput: HTMLInputElement | undefined;
  const [betInputValue, setBetInputValue] = createSignal(0);

  let trumpInput: HTMLInputElement | undefined;
  const [trumpInputValue, setTrumpInputValue] = createSignal(0);

  const [state, actions] = createGameStore();
  // @ts-ignore
  window.game = {
    state,
    actions,
  };

  const trumpCard = createMemo(() => getCurrentTrumpCard(state));
  const winningCard = createMemo(() => getCurrentWinningCard(state));
  const players = createMemo(() => Object.values(state.players).sort());
  const currentPlayer = createMemo(() => getCurrentPlayer(state));
  const isCurrentPlayer = createMemo(
    () => state.playerId === state.playOrder[state.playOrderPos]
  );
  const currentHand = createMemo(
    () => state.round.hand[state.round.currentHand]
  );

  const handleStartGame = () => {
    const value = (playerInput as HTMLInputElement).valueAsNumber;
    actions.startGame(value);
  };

  const handleSetBet = () => {
    const value = (betInput as HTMLInputElement).valueAsNumber;
    actions.setBet(state.playerId, value);
  };

  const onClickComputer = (player: Player) => () => {
    if (player.id !== currentPlayer() || player.id === state.playerId) return;

    if (state.phase === "betting") {
      const max = state.round.id + 1;
      const bet = Math.floor(Math.random() * max);
      actions.setBet(player.id, bet);
      return;
    }

    if (state.phase === "playing") {
      const valids = getValidCards(currentHand(), player.hand);
      const card = valids[Math.floor(Math.random() * valids.length)];
      actions.playCard(player.id, card);
      return;
    }

    if (state.phase === "dealing") {
      actions.dealCards();
      return;
    }

    if (state.phase === "trump") {
      const suitId = Math.floor(Math.random() * 4);
      actions.decideTrump(suitId);
      return;
    }
  };

  const handlePlayCard = (card: CardId) => {
    if (!isCurrentPlayer()) return;
    actions.playCard(state.playerId, card);
  };

  const handleSetTrump = () => {
    const value = (trumpInput as HTMLInputElement).valueAsNumber;
    actions.decideTrump(value);
  };

  const handleClickHand = () => {
    if (currentHand().length !== state.playOrder.length) return;
    actions.endHand();
  };

  return (
    <div
      data-testid="root"
      class="bg-gradient-to-br from-slate-800 to-slate-900 text-white h-full relative overflow-hidden flex flex-col"
    >
      <header data-testid="header" class="flex-none h-14"></header>
      <main class="relative flex-1">
        <div
          data-testid="board"
          class="absolute-ontop m-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full shadow-2xl before:absolute-ontop before:bg-gradient-to-br before:from-slate-700 before:to-slate-800 before:rounded-full before:m-1 before:shadow-inner after:absolute-ontop after:bg-gradient-to-br after:from-slate-500 after:to-slate-600 after:rounded-full after:m-7 after:shadow ml-"
        />
        <div class="relative z-10 h-full p-3 grid grid-rows-4 grid-flow-cols">
          <For each={players()}>
            {(player, index) => (
              <div
                data-testid={`player-${index()}`}
                class="flex items-center gap-2"
                classList={{
                  "col-span-3 flex-col": index() === 3,
                  "row-start-2 col-start-3 flex-row-reverse": index() === 4,
                  "row-start-3 col-start-3 flex-row-reverse": index() === 5,
                  "row-start-4 col-span-3 flex-col-reverse": index() === 0,
                  "row-start-3": index() === 1,
                  "row-start-2": index() === 2,
                }}
              >
                <div
                  data-testid="avatar"
                  class="w-10 h-10 rounded-xl ring-2"
                  classList={{
                    "bg-red-600": index() === 0,
                    "bg-green-600": index() === 1,
                    "bg-pink-600": index() === 2,
                    "bg-orange-600": index() === 3,
                    "bg-purple-600": index() === 4,
                    "bg-sky-600": index() === 5,
                    "ring-slate-900":
                      index() !== state.playOrderPos ||
                      state.phase === "pregame",
                    "ring-teal-400 ring-offset-2 ring-offset-slate-900":
                      index() === state.playOrderPos &&
                      state.phase !== "pregame",
                  }}
                  onClick={onClickComputer(player)}
                />
                <Show when={player.hand.length}>
                  <Show
                    when={player.id === state.playerId}
                    fallback={
                      <div class="w-8 h-14 rounded-md bg-slate-400 shadow-sm" />
                    }
                  >
                    <div class="flex gap-1">
                      <For each={player.hand}>
                        {(cardId) => (
                          <Card
                            cardId={cardId}
                            onClick={() => handlePlayCard(cardId)}
                          />
                        )}
                      </For>
                    </div>
                  </Show>
                </Show>
              </div>
            )}
          </For>
          <div class="row-start-2 col-start-2 flex justify-center items-center">
            <Show when={trumpCard() !== undefined}>
              <Card cardId={trumpCard() as number} />
              {/* TODO: Show choosen trump suit if wizard was drawn */}
            </Show>
          </div>
          {/* TODO: Allow for different widths depending on the number of players */}
          <div class="row-start-3 col-start-2">
            <Switch>
              <Match when={state.phase === "pregame"}>
                <label class="block">
                  <span class="block">
                    Select the number of players: {playerInputValue}
                  </span>
                  <input
                    ref={playerInput}
                    type="range"
                    min={3}
                    max={6}
                    step={1}
                    value={6}
                    onInput={(evt) =>
                      setPlayerInputValue(evt.currentTarget.valueAsNumber)
                    }
                  />
                </label>
                <button onClick={handleStartGame}>Start Game</button>
              </Match>
              <Match when={isCurrentPlayer() && state.phase === "dealing"}>
                <button onClick={actions.dealCards}>Deal Cards</button>
              </Match>
              <Match when={isCurrentPlayer() && state.phase === "trump"}>
                <label class="block">
                  <span class="block">
                    Decide the trump suit for the round:{" "}
                    {cardSuits[trumpInputValue()]}
                  </span>
                  <input
                    ref={trumpInput}
                    type="range"
                    min={0}
                    max={3}
                    step={1}
                    value={0}
                    onInput={(evt) =>
                      setTrumpInputValue(evt.currentTarget.valueAsNumber)
                    }
                  />
                </label>
                <button onClick={handleSetTrump}>Set Trump</button>
              </Match>
              <Match when={isCurrentPlayer() && state.phase === "betting"}>
                <label class="block">
                  <span class="block">Decide your bet: {betInputValue}</span>
                  <input
                    ref={betInput}
                    type="range"
                    min={0}
                    max={state.round.id + 1}
                    step={1}
                    value={0}
                    onInput={(evt) =>
                      setBetInputValue(evt.currentTarget.valueAsNumber)
                    }
                  />
                </label>
                <button onClick={handleSetBet}>Make Bet</button>
              </Match>
              <Match when={state.phase === "playing"}>
                <div
                  class="mx-auto flex flex-row flex-wrap justify-center content-center gap-1"
                  classList={{
                    "w-[104px]":
                      state.playOrder.length === 3 ||
                      state.playOrder.length === 5 ||
                      state.playOrder.length === 6,
                    "w-[140px]": state.playOrder.length === 4,
                  }}
                  onClick={handleClickHand}
                >
                  <For each={currentHand()}>
                    {(id, index) => (
                      <Card
                        class="flex-none"
                        cardId={id}
                        winningCard={index() === winningCard()}
                      />
                    )}
                  </For>
                </div>
              </Match>
            </Switch>
          </div>
        </div>
      </main>
      <footer data-testid="footer" class="flex-none h-14"></footer>
    </div>
  );
};

export default App;
