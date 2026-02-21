import type { NextRequest } from "next/server";

export const createTRPCContext = async (opts: {
  headers: Headers;
  req: NextRequest;
}) => {
  const { req } = opts;

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1";

  return {
    clientIp,
  };
};
