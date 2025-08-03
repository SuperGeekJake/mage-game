import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { router, publicProcedure } from "~/trpc.js";
import { auth } from "./betterAuth.js";

export const authRouter = router({
  signIn: publicProcedure
    .input(z.object({ email: z.email(), username: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // TODO: Check username for inappropriate content
      const validUsername = true;
      if (!validUsername) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "INVALID_USERNAME",
        });
      }

      const data = await auth.api.signInMagicLink({
        body: {
          email: input.email,
          name: input.username,
        },
        headers: ctx.headers,
      });

      if (data.status === false) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "INVALID_EMAIL",
          cause: input.email,
        });
      }

      return {
        success: true,
        data: {
          email: input.email,
          username: input.username,
        },
      };
    }),
  verifyMagicLink: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input, ctx }) => {
      // TODO: Handle error
      const data = await auth.api.magicLinkVerify({
        query: {
          token: input.token,
        },
        headers: ctx.headers,
      });
      return {
        success: true,
        data: data,
      };
    }),
});
