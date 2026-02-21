import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { appRouter } from "@/lib/trpc/root";
import { createTRPCContext } from "@/lib/trpc/context";

const handler = async (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        headers: req.headers,
        req,
      }),
    onError: ({ path, error }) => {
      if (process.env.NODE_ENV === "development") {
        console.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
        );
        console.error("Full error details:", {
          code: error.code,
          message: error.message,
          stack: error.stack,
          cause: error.cause,
        });
      } else {
        console.error(`tRPC error on ${path ?? "<no-path>"}:`, {
          code: error.code,
          message: error.message,
        });
      }
    },
  });
};

export { handler as GET, handler as POST };
