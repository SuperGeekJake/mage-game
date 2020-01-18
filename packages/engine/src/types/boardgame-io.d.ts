declare module 'boardgame.io/core' {
  export interface ActivePlayersConfig {
    all?: Stage.NULL;
    others?: Stage.NULL;
    moveLimit?: number;
  }

  export const ActivePlayers = {
      /**
       * The turn stays with one player, but any player can play (in any order)
       * until the phase ends.
       */
      ALL: ActivePlayersConfig,

      /**
       * The turn stays with one player, but any player can play (once, and in any order).
       * This is typically used in a phase where you want to elicit a response
       * from every player in the game.
       */
      ALL_ONCE: ActivePlayersConfig,

      /**
       * The turn stays with one player, and every *other* player can play (in any order)
       * until the phase ends.
       */
      OTHERS: ActivePlayersConfig,

      /**
       * The turn stays with one player, and every *other* player can play (once, and in any order).
       * This is typically used in a phase where you want to elicit a response
       * from every *other* player in the game.
       */
      OTHERS_ONCE: ActivePlayersConfig
  };

  /**
   * Moves can return this when they want to indicate
   * that the combination of arguments is illegal and
   * the move ought to be discarded.
   */
  export const INVALID_MOVE: 'INVALID_MOVE';

  export const Stage = {
    NULL: null
  };

  export interface TurnOrderConfig {
    playOrder?: (G: any) => number[];
    first: (G: any, ctx: any) => number;
    next: (G: any, ctx: any) => number;
  }

  /**
   * Set of different turn orders possible in a phase.
   * These are meant to be passed to the `turn` setting
   * in the flow objects.
   *
   * Each object defines the first player when the phase / game
   * begins, and also a function `next` to determine who the
   * next player is when the turn ends.
   *
   * The phase ends if next() returns undefined.
   */
  export const TurnOrder = {
    /**
     * The default round-robin turn order.
     */
    DEFAULT: TurnOrderConfig,

    /**
     * Similar to DEFAULT, but starts from 0 each time.
     */
    RESET: TurnOrderConfig,

    /**
     * Similar to DEFAULT, but starts with the player who ended the last phase.
     */
    CONTINUE: TurnOrderConfig,

    /**
     * Another round-robin turn order, but goes around just once.
     * The phase ends after all players have played.
     */
    ONCE: TurnOrderConfig,

    /**
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase.
     */
    CUSTOM: (playerOrder: number[]) => TurnOrderConfig,

    /**
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase to a value specified by a field
     * in G.
     */
    CUSTOM_FROM: (playOrderField: string) => TurnOrderConfig,

    /**
     * SKIP
     *
     * Round-robin, but skips over any players that have passed.
     * Meant to be used with Pass above.
     */
    SKIP: TurnOrderConfig
  };

  /**
   * PlayerView reducers.
   */
  export const PlayerView = {
    /**
     * Reducer which removes a key named `secret` and
     * removes all the keys in `players`, except for the one
     * corresponding to the current playerID.
     */
    STRIP_SECRETS: (G, ctx, playerID) => any
  };
}

declare module 'boardgame.io/client' {
  export interface ClientOptions {
    game: any,
    numPlayers?: number,
    multiplayer?: Object | false,
    gameID?: string,
    playerID?: string,
    credentials?: any
  }

  export function Client(opts: ClientOptions): {
    store: { getState: () => any }
  };
}
