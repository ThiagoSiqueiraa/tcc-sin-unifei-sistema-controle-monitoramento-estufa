import moment from "moment";
import mqtt, { MqttClient } from "mqtt";
import { container } from "tsyringe";

import { ConfirmAckUseCase } from "../modules/devices/useCases/confirmAck/ConfirmAckUseCase";
import { ExecuteRuleDevicesController } from "../modules/devices/useCases/executeRuleDevices/ExecuteRuleDevicesController";
import { InsertDHT22ValuesController } from "../modules/sensors/useCases/insertDHT22Values/InsertDHT22ValuesController";
import { InsertSoilSensorValueController } from "../modules/sensors/useCases/insertSoilSensorValue/InsertSoilSensorValueController";
import logger from "../utils/winston-logger";
import { IWebSocket } from "../websocket/IWebSocket";
import { getMinimumMaximumValues } from "../websocket/minimum-maximum-values";

class MQTT {
  private client: MqttClient;
  private serverIO;
  private clientId;
  private insertDHT22ValueController: InsertDHT22ValuesController;
  private insertSoilSensorValueController: InsertSoilSensorValueController;
  private executeRuleDevicesController: ExecuteRuleDevicesController;
  private humMinimumMaximum: {
    minimum: number;
    maximum: number;
  };
  private tempMinimumMaximum: {
    minimum: number;
    maximum: number;
  };

  constructor(
    { host, port }: { host: string; port: string },
    serverIO: IWebSocket
  ) {
    this.serverIO = serverIO;
    this.clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    this.client = mqtt.connect(`mqtt://${host}:${port}`, {
      clientId: this.clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.executeRuleDevicesController = new ExecuteRuleDevicesController();
    this.insertDHT22ValueController = new InsertDHT22ValuesController();
    this.insertSoilSensorValueController =
      new InsertSoilSensorValueController();
    this.humMinimumMaximum = {
      minimum: 0,
      maximum: 0,
    };
    this.tempMinimumMaximum = {
      minimum: 0,
      maximum: 0,
    };
  }

  async init(): Promise<void> {
    const response = await getMinimumMaximumValues();
    if (response) {
      const { temperature, humidity } = response;
      this.humMinimumMaximum = {
        minimum: humidity.minimum,
        maximum: humidity.maximum,
      };
      this.tempMinimumMaximum = {
        minimum: temperature.minimum,
        maximum: temperature.maximum,
      };
    }
  }

  start(): void {
    const topics = [
      "sensor/dht22",
      "sensor/soil",
      "sensor/test",
      "ack/atuadores",
    ];
    this.client.on("connect", () => {
      this.client.subscribe(topics, () => {
        logger.info(`Subscribe to topics '${topics}'`);
      });
    });
  }

  emit(topic: string, data: any): void {
    this.client.publish(topic, JSON.stringify(data));
  }

  getMinimumMaximumTemp(valueRead: number): void {
    if (
      this.tempMinimumMaximum.minimum === 0 &&
      this.tempMinimumMaximum.maximum === 0
    ) {
      this.tempMinimumMaximum.minimum = valueRead;
      this.tempMinimumMaximum.maximum = valueRead;
    } else {
      if (this.tempMinimumMaximum.minimum > valueRead) {
        this.tempMinimumMaximum.minimum = valueRead;
      }
      if (this.tempMinimumMaximum.maximum < valueRead) {
        this.tempMinimumMaximum.maximum = valueRead;
      }
    }
  }

  getMinimumMaximumHum(valueRead: number): void {
    if (
      this.humMinimumMaximum.minimum === 0 &&
      this.humMinimumMaximum.maximum === 0
    ) {
      this.humMinimumMaximum.minimum = valueRead;
      this.humMinimumMaximum.maximum = valueRead;
    } else {
      if (this.humMinimumMaximum.minimum > valueRead) {
        this.humMinimumMaximum.minimum = valueRead;
      }
      if (this.humMinimumMaximum.maximum < valueRead) {
        this.humMinimumMaximum.maximum = valueRead;
      }
    }
  }

  listen(): void {
    this.client.on("message", (topic, payload) => {
      if (topic === "ack/atuadores") {
        const confirmAckUseCase = container.resolve(ConfirmAckUseCase);
        confirmAckUseCase.execute(payload.toString());
        return;
      }

      const parsedMessage = JSON.parse(payload.toString());
      const timestamp = Date.now();
      console.log(
        "This message will include a complete object: %O",
        parsedMessage
      );

      let { temperature, humidity } = parsedMessage;
      console.log("temperature before calibration: %O", temperature);
      console.log("humidity before calibration: %O", humidity);
      temperature = +(0.942 * temperature + 0.977).toFixed(2);
      if (humidity > 65) {
        humidity = +(1.57 * humidity - 46.2).toFixed(2);
      }
      console.log("temperature after calibration: %O", temperature);
      console.log("humidity after calibration: %O", humidity);
      console.log(
        "next lecture in timestamp + 3 minutes: %O",
        moment(timestamp + 180000).format("DD/MM/YYYY HH:mm:ss")
      );
      if (topic === "sensor/test") {
        this.executeRuleDevicesController.handle({
          facts: {
            airTemperature: temperature,
            airHumidity: humidity,
          },
        });
        return;
      }
      if (topic === "sensor/dht22") {
        this.getMinimumMaximumHum(humidity);
        this.getMinimumMaximumTemp(temperature);

        this.serverIO.emit("SENSOR_DHT22", {
          timestamp,
          temperature: {
            actual: +temperature.toFixed(2),
            minimum: +this.tempMinimumMaximum.minimum.toFixed(2),
            maximum: +this.tempMinimumMaximum.maximum.toFixed(2),
          },
          humidity: {
            actual: +humidity.toFixed(2),
            minimum: +this.humMinimumMaximum.minimum.toFixed(2),
            maximum: +this.humMinimumMaximum.maximum.toFixed(2),
          },
        });

        this.insertDHT22ValueController.handle({
          temperature,
          humidity,
          date_received: timestamp,
        });

        this.executeRuleDevicesController.handle({
          facts: {
            airTemperature: temperature,
            airHumidity: humidity,
          },
        });
      } else if (topic === "sensor/soil") {
        this.insertSoilSensorValueController.handle({
          soilHumidity: parsedMessage.soilHumidity,
          id: 1,
          dateReceived: timestamp,
        });
      }
    });
  }
}

export { MQTT };
