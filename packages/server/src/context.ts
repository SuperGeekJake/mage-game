import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import type { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import type { IncomingHttpHeaders } from "http";

import { auth } from "~/auth/betterAuth.js";

export const createContext = async (
  opts: CreateHTTPContextOptions | CreateWSSContextFnOptions
) => {
  const headers = createHeaders(opts.req.headers);
  const session = await getServerSession(headers);
  return {
    headers,
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

function createHeaders(httpHeaders: IncomingHttpHeaders) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(httpHeaders)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        headers.append(key, v);
      }
    } else if (value) {
      headers.set(key, value);
    }
  }

  return headers;
}

async function getServerSession(headers: Headers) {
  const data = await auth.api.getSession({
    headers,
  });

  return data
    ? {
        ...data.session,
        user: data.user,
      }
    : null;
}
