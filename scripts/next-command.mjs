import { spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generatedDirs = [".next", ".next-dev", ".next-build"];

function assertGeneratedDir(dirName) {
  if (!generatedDirs.includes(dirName)) {
    throw new Error(`Refusing to clean unexpected directory: ${dirName}`);
  }

  const fullPath = resolve(root, dirName);
  if (!fullPath.startsWith(root)) {
    throw new Error(`Refusing to clean outside the project: ${fullPath}`);
  }

  return fullPath;
}

function cleanDir(dirName) {
  const fullPath = assertGeneratedDir(dirName);
  if (existsSync(fullPath)) {
    rmSync(fullPath, { recursive: true, force: true });
    console.log(`Cleaned ${dirName}`);
  }
}

function runNext(args, distDir, { clean = false } = {}) {
  if (clean) {
    cleanDir(distDir);
  }

  const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");
  const result = spawnSync(process.execPath, [nextBin, ...args], {
    cwd: root,
    env: {
      ...process.env,
      NEXT_DIST_DIR: distDir
    },
    stdio: "inherit"
  });

  process.exitCode = result.status ?? 1;
  return process.exitCode;
}

const command = process.argv[2];
const forwardedArgs = process.argv.slice(3);

switch (command) {
  case "clean":
    generatedDirs.forEach(cleanDir);
    break;
  case "dev":
    runNext(["dev", ...forwardedArgs], ".next-dev", { clean: true });
    break;
  case "build":
    runNext(["build", ...forwardedArgs], ".next-build", { clean: true });
    break;
  case "start":
    runNext(["start", ...forwardedArgs], ".next-build");
    break;
  case "demo": {
    cleanDir(".next-build");
    const buildCode = runNext(["build"], ".next-build");
    if (buildCode === 0) {
      runNext(["start", ...forwardedArgs], ".next-build");
    }
    break;
  }
  default:
    console.error("Usage: node scripts/next-command.mjs <clean|dev|build|start|demo> [...next args]");
    process.exitCode = 1;
}
