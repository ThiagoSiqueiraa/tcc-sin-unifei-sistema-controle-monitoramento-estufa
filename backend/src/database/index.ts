import { createConnection } from "typeorm";

import { Chart } from "../modules/charts/entities/Chart";
import { ACK } from "../modules/devices/entities/ACK";
import { Device } from "../modules/devices/entities/Device";
import { Event } from "../modules/devices/entities/Event";
import { Rule } from "../modules/devices/entities/Rule";
import { Genetic } from "../modules/plants/entities/Genetic";
import { Plant } from "../modules/plants/entities/Plant";
import { DHT22 } from "../modules/sensors/entities/DHT22";
import { SoilSensor } from "../modules/sensors/entities/SoilSensor";
import { User } from "../modules/users/entities/User";

const connect = async () => {
  await createConnection({
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    database: "estufa_inteligente",
    entities: [
      ACK,
      Device,
      Plant,
      Genetic,
      Event,
      Rule,
      DHT22,
      User,
      SoilSensor,
      Chart,
    ],
  });
};
connect();
