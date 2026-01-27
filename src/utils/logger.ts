type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, message: string, meta?: any) {
  const logEntry = {
    level,
    message,
    time: new Date().toISOString(),
    ...meta,
  };

  if (level === "error") {
    console.error(logEntry);
  } else {
    console.log(logEntry);
  }
}

export const logger = {
  info: (message: string, meta?: any) => log("info", message, meta),

  warn: (message: string, meta?: any) => log("warn", message, meta),

  error: (message: string, meta?: any) => log("error", message, meta),
};
