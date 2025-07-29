import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "@auth/core/providers/github";
import type { AuthConfig } from "@auth/core";

import { db } from "../db/index.js";

export const authConfig: AuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
};
