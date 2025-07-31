import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import z from "zod";

import { appRouter } from "./routers/_app.js";

const ENV = z
  .object({
    PORT: z.coerce.number(),
  })
  .parse({
    PORT: process.env.PORT,
  });

const wss = new WebSocketServer({
  port: ENV.PORT,
});

const handler = applyWSSHandler({ wss, router: appRouter });

wss.on("listening", () => {
  console.log(`WebSocket Server listening on ws://localhost:${ENV.PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
