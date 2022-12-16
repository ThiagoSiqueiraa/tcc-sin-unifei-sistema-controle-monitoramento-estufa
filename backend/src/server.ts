import "reflect-metadata";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import http from "http";

import "express-async-errors";
import { HttpError } from "./errors/HttpError";
import { MQTT } from "./mqtt";
import { routes } from "./routes";
import "./database";
import "./shared/container";
import logger from "./utils/winston-logger";
import { WebSocket } from "./websocket";

const app = express();
app.use(cors());

const normalizePort = (val: number | string): number | string | boolean => {
  const normolizedPort = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(normolizedPort)) {
    return val;
  }

  if (normolizedPort >= 0) {
    return normolizedPort;
  }

  return false;
};

const PORT = normalizePort(process.env.PORT || 3001);

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    logger.error({
      message: err.message,
      stack: err.stack,
    });

    if (err instanceof HttpError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);
const server = http.createServer(app);

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);
};

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);

const ws = new WebSocket(server);
const mqtt = new MQTT({ host: "192.168.31.176", port: "1883" }, ws);

mqtt.start();
mqtt.listen();

export { mqtt };
