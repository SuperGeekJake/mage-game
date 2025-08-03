import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import z from "zod";
import { Resend } from "resend";

import { db } from "~/db/index.js";

const ENV = z
  .object({
    AUTH_SECRET: z.string(),
    BASE_URL: z.string(),
    EMAIL_FROM: z.string(),
    RESEND_API_KEY: z.string(),
  })
  .parse({
    AUTH_SECRET: process.env.AUTH_SECRET,
    BASE_URL: process.env.BASE_URL,
    EMAIL_FROM: process.env.EMAIL_FROM,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  });

const resend = new Resend(ENV.RESEND_API_KEY);

export const auth = betterAuth({
  secret: ENV.AUTH_SECRET,
  baseURL: ENV.BASE_URL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: ENV.EMAIL_FROM,
          to: email,
          subject: "Mage Game: Verify Your Email Address",
          html: `Click the following link to verify your email address and begin playing <em>Mage</em>.\n\n<a href="${url}">${url}</a>`,
        });
      },
    }),
  ],
});
