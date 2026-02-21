import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@repo/api/trpc";

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>();
