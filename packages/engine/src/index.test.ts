import { Client } from "boardgame.io/client";
import { factory } from "./testUtils";
import { config } from "./index";
import * as Card from "./card";

import { Metadata, GameState, DeepPartial } from './types/mage';

const ctx = factory.ctx();

const createClient = (initState: DeepPartial<GameState> = {}) =>
  Client({
    game: {
      ...config,
      setup: () => factory.state(initState)
    }
  });

it("should start with the deal phase", () => {
  const client = createClient();
  const { G, ctx }: { G: GameState; ctx: Metadata } = client.store.getState();
  const isTrumpMage = Card.isMage(G.round.trump as number);
  // If not a mage, skip on to the bet phase
  const phase = isTrumpMage ? ctx.phase : ctx.prevPhase;
  expect(phase).toEqual("deal");
});
