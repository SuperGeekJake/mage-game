import { mergeRouters } from "~/trpc.js";
import { authRouter } from "./auth.js";

export const appRouter = mergeRouters(authRouter);
export type AppRouter = typeof appRouter;
