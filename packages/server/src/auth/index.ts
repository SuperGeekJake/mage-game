import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Nodemailer from "@auth/core/providers/nodemailer";
import type { AuthConfig } from "@auth/core";
import z from "zod";

import { db } from "../db/index.js";

const ENV = z
  .object({
    EMAIL_SERVER: z.string(),
    EMAIL_FROM: z.string(),
  })
  .parse({
    EMAIL_SERVER: process.env.EMAIL_SERVER,
    EMAIL_FROM: process.env.EMAIL_FROM,
  });

export const authConfig: AuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    Nodemailer({
      server: ENV.EMAIL_SERVER,
      from: ENV.EMAIL_FROM,
    }),
  ],
};
