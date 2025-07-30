import { z } from "zod";

import { router, publicProcedure } from "~/trpc.js";

export const authRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    return `Hello, ${input ?? "world"}!`;
  }),
});
