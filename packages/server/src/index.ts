import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import z from "zod";

import { mergeRouters } from "~/trpc.js";
import { createContext } from "./context.js";
import { authRouter } from "./auth/router.js";

const ENV = z
  .object({
    PORT: z.coerce.number(),
  })
  .parse({
    PORT: process.env.PORT,
  });

const router = mergeRouters(authRouter);
export type Router = typeof router;

const wss = new WebSocketServer({
  port: ENV.PORT,
});

const handler = applyWSSHandler({ wss, router, createContext });

wss.on("listening", () => {
  console.log(`WebSocket Server listening on ws://localhost:${ENV.PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
