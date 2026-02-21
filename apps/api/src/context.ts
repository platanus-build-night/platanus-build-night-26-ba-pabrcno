export function createContext(opts: { req: Request }) {
  const clientIp =
    opts.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    opts.req.headers.get("x-real-ip") ??
    "127.0.0.1";

  return {
    clientIp,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
