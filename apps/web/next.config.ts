import type { NextConfig } from "next";
import path from "path";
import { config } from "dotenv";

// Load root .env so NEXT_PUBLIC_* vars are available (monorepo)
config({ path: path.resolve(__dirname, "../../.env") });

const nextConfig: NextConfig = {};

export default nextConfig;
