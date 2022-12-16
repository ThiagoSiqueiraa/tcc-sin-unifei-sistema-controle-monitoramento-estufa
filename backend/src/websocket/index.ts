import { Server } from "socket.io";

import { GetLastDHT22ValueController } from "../modules/sensors/useCases/getLastDHT22Value/GetLastDHT22ValueController";
import { GetMinMaxValuesOnRangeDateController } from "../modules/sensors/useCases/getMinMaxValuesOnRangeDate/infra/websocket/GetMinMaxValuesOnRangeDateController";
import { IWebSocket } from "./IWebSocket";
import { getMinimumMaximumValues } from "./minimum-maximum-values";

class WebSocket implements IWebSocket {
  private io: Server;
  private minMaxValuesOnRangeDateController: GetMinMaxValuesOnRangeDateController;
  private lastValueDHT22Controller: GetLastDHT22ValueController;

  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this.minMaxValuesOnRangeDateController =
      new GetMinMaxValuesOnRangeDateController();

    this.lastValueDHT22Controller = new GetLastDHT22ValueController();

    this.io.on("connection", async (socket) => {
      const start = new Date();
      start.setUTCHours(0, 0, 0, 0);

      const end = new Date();
      end.setUTCHours(23, 59, 59, 999);

      const response = await getMinimumMaximumValues();
      const lastDHT22Value = await this.lastValueDHT22Controller.handle();
      if (response) {
        const { temperature, humidity } = response;
        Object.assign(temperature, {
          actual: lastDHT22Value.temperature,
        });

        Object.assign(humidity, {
          actual: lastDHT22Value.humidity,
        });

        this.io.emit("init", {
          temperature,
          humidity,
          timestamp: lastDHT22Value.date_received,
        });
      }
    });
  }

  emit(topic: string, data: any): void {
    this.io.emit(topic, data);
  }
}

export { WebSocket };
