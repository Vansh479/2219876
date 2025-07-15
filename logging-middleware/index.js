import axios from "axios";

const ALLOWED_STACKS = ["frontend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const ALLOWED_PACKAGES = ["api", "auth", "config", "middleware", "utils"];

export async function log(stack, level, pkg, message) {
  if (!ALLOWED_STACKS.includes(stack)) {
    console.error(`Invalid stack: ${stack}`);
    return;
  }
  if (!ALLOWED_LEVELS.includes(level)) {
    console.error(`Invalid level: ${level}`);
    return;
  }
  if (!ALLOWED_PACKAGES.includes(pkg)) {
    console.error(`Invalid package: ${pkg}`);
    return;
  }

  const body = { stack, level, package: pkg, message };
  try {
    const res = await axios.post("http://20.244.56.144/evaluation-service/logs", body);
    console.log(`Log created: ${res.data.logID}`);
  } catch (err) {
    console.error("Failed to log to server", err);
  }
}
