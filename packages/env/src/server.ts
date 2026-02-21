import { config } from "dotenv";
import { resolve } from "path";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Load .env from cwd or monorepo root
config({
  path: [
    resolve(process.cwd(), ".env"),
    resolve(process.cwd(), "../../.env"),
  ],
});

const serverSchema = {
  ANTHROPIC_API_KEY: z.string().min(1),
  ANTHROPIC_MODEL: z.string().default("claude-sonnet-4-20250514"),
  SERPAPI_API_KEY: z.string().min(1),
  SERPAPI_BASE_URL: z
    .string()
    .url()
    .default("https://serpapi.com/search.json"),
  SERPAPI_RESULTS_PER_PAGE: z.coerce.number().int().positive().default(10),
  SERPAPI_TRENDS_DATE: z.string().default("today 12-m"),
  ALIEXPRESS_APP_KEY: z.string().optional(),
  ALIEXPRESS_APP_SECRET: z.string().optional(),
  TAVILY_API_KEY: z.string().min(1),
  TAVILY_SEARCH_DEPTH: z.enum(["basic", "advanced"]).default("advanced"),
  TAVILY_MAX_RESULTS: z.coerce.number().int().positive().default(5),
  TAVILY_INCLUDE_ANSWER: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  GEOLOCATION_API_URL: z
    .string()
    .url()
    .default("http://ip-api.com/json"),
};

export type ServerEnv = {
  ANTHROPIC_API_KEY: string;
  ANTHROPIC_MODEL: string;
  SERPAPI_API_KEY: string;
  SERPAPI_BASE_URL: string;
  SERPAPI_RESULTS_PER_PAGE: number;
  SERPAPI_TRENDS_DATE: string;
  ALIEXPRESS_APP_KEY?: string;
  ALIEXPRESS_APP_SECRET?: string;
  TAVILY_API_KEY: string;
  TAVILY_SEARCH_DEPTH: "basic" | "advanced";
  TAVILY_MAX_RESULTS: number;
  TAVILY_INCLUDE_ANSWER: boolean;
  DATABASE_URL: string;
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  CORS_ORIGIN: string;
  GEOLOCATION_API_URL: string;
};

let _env: ServerEnv | null = null;

function getEnv(): ServerEnv {
  if (!_env) {
    _env = createEnv({
      server: serverSchema,
      runtimeEnv: process.env,
      emptyStringAsUndefined: true,
    }) as ServerEnv;
  }
  return _env;
}

// Lazy proxy: validates only on first property access (at runtime, not build time)
export const env = new Proxy({} as ServerEnv, {
  get(_, prop: string) {
    return getEnv()[prop as keyof ServerEnv];
  },
});
