/** @type {import('next').NextConfig} */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const hostname = supabaseUrl ? new URL(supabaseUrl).hostname : "";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname,
      },
    ],
  },
};

module.exports = nextConfig;