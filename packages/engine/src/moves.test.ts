import _ from "lodash";
import { INVALID_MOVE } from "boardgame.io/core";
import moves from "./moves";
import { factory } from "./testUtils";

const ctx = factory.ctx();

describe("setTrump", () => {
  it("should work correctly", () => {
    const state = factory.state({
      round: {
        dealer: "2",
        trump: 14
      }
    });
    moves.setTrump(state, ctx, "club");
    expect(state).toEqual(
      factory.state({
        round: {
          dealer: "2",
          trump: "club"
        }
      })
    );
  });

  it("should noop if passed invalid suite", () => {
    const state = factory.state({
      round: {
        dealer: "2",
        trump: 14
      }
    });
    // @ts-ignore Intentionally bad argument
    const output = moves.setTrump(state, ctx, "fake");
    expect(output).toEqual(INVALID_MOVE);
    expect(state).toEqual(
      factory.state({
        round: {
          dealer: "2",
          trump: 14
        }
      })
    );
  });
});

describe("playCard", () => {
  it("should work correctly", () => {
    const state = factory.state({
      players: {
        "0": {
          hand: [14, 6, 37]
        }
      }
    });
    moves.playCard(state, ctx, 1);
    expect(state).toEqual(
      factory.state({
        players: {
          "0": {
            hand: [14, 37]
          }
        },
        round: {
          trick: {
            cards: [["0", 6]]
          }
        }
      })
    );
  });

  it("should noop if passed invalid index", () => {
    const state = factory.state({
      players: {
        "0": {
          hand: [14, 6, 37]
        }
      }
    });
    const output = moves.playCard(state, ctx, 10);
    expect(output).toEqual(INVALID_MOVE);
    expect(state).toEqual(
      factory.state({
        players: {
          "0": {
            hand: [14, 6, 37]
          }
        }
      })
    );
  });
});

describe("placeBet", () => {
  it("should work correctly", () => {
    const state = factory.state({
      round: {
        id: 2
      }
    });
    moves.placeBet(state, ctx, 2);
    expect(state).toEqual(
      factory.state({
        players: {
          "0": {
            tricks: 0,
            bet: 2
          }
        },
        round: {
          id: 2
        }
      })
    );
  });

  it("should noop if passed invalid bet", () => {
    const state = factory.state({
      round: {
        id: 2
      }
    });
    let output = moves.placeBet(state, ctx, 4);
    expect(output).toEqual(INVALID_MOVE);
    output = moves.placeBet(state, ctx, -1);
    expect(output).toEqual(INVALID_MOVE);
    expect(state).toEqual(
      factory.state({
        round: {
          id: 2
        }
      })
    );
  });
});
