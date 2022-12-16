import { createLogger, transports, format } from "winston";

const defaultLevel = process.env.LOG_LEVEL || "info";

const options = {
  exitOnError: false,
  level: defaultLevel,
};

const logger = createLogger(options);

if (process.env.NODE_ENV === "development") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp(),
        format.padLevels(),
        format.json(),
        format.splat()
      ),
      level: "debug",
    })
  );
} else {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp(),
        format.padLevels()
      ),
      level: "info",
    })
  );
}

export default logger;
