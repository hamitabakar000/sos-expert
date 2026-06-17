/** @type {import('next').NextConfig} */
const allowedDistDirs = new Set([".next", ".next-dev", ".next-build"]);
const requestedDistDir = process.env.NEXT_DIST_DIR;

const nextConfig = {
  distDir: allowedDistDirs.has(requestedDistDir) ? requestedDistDir : ".next"
};

export default nextConfig;
