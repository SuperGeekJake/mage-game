import { Metadata, GameState } from './types/mage';

const endGameIf = (G: GameState, ctx: Metadata) => {
  const finalRound = 60 / ctx.numPlayers;
  if (G.round.id > finalRound) {
    const column = G.data[finalRound].col;
    const winner = Object.entries(column).reduce(
      (result, [playerId, { score }]) => {
        const bestScore = column[result[0]].score;
        if (score > bestScore) {
          return [playerId];
        } else if (score === bestScore) {
          return [...result, playerId];
        }

        return result;
      },
      ["0"]
    );

    return { winner };
  }
};

export default {
  endGameIf
};
