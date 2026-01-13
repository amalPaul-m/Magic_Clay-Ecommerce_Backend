import fs from "fs";
import path from "path";


const logFilePath = path.join(process.cwd(), "logs.txt");

const logger = (req, res, next) => {
  const now = new Date().toISOString();
  const logMessage = `[${now}] ${req.method} ${req.originalUrl} Body: ${JSON.stringify(req.body || {})}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log:", err);
    }
  });

  console.log(logMessage);
  next();
};

export default logger;
