import events from "./events";
import { factory } from "./testUtils";

const ctx = factory.ctx();

describe("endGameIf", () => {
  it("should correctly decide winner", () => {
    const state = factory.state({
      round: {
        id: 21
      },
      data: {
        20: {
          col: {
            "0": {
              score: -20
            },
            "1": {
              score: 180
            },
            "2": {
              score: 160
            }
          }
        }
      }
    });
    const actual = events.endGameIf(state, ctx);
    expect(actual).toEqual({ winner: ["1"] });
  });

  it("should declare mutiple winners on a tie", () => {
    const state = factory.state({
      round: {
        id: 21
      },
      data: {
        20: {
          col: {
            "0": {
              score: -20
            },
            "1": {
              score: 180
            },
            "2": {
              score: 180
            }
          }
        }
      }
    });
    const actual = events.endGameIf(state, ctx);
    expect(actual).toEqual({ winner: ["1", "2"] });
  });

  it("should correctly decide if game is over", () => {
    const state = factory.state({
      round: {
        id: 20
      },
      data: {
        19: {
          col: {
            "0": {
              score: -20
            },
            "1": {
              score: 180
            },
            "2": {
              score: 180
            }
          }
        }
      }
    });
    const actual = events.endGameIf(state, ctx);
    expect(actual).toEqual(undefined);
  });
});
