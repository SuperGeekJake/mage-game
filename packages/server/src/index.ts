import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";

import { appRouter } from "./trpc/index.js";

const wss = new WebSocketServer({
  port: 3001,
});

const handler = applyWSSHandler({ wss, router: appRouter });

wss.on("listening", () => {
  console.log("WebSocket Server listening on ws://localhost:3001");
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
