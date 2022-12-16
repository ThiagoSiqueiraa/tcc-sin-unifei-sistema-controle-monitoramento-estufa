import { SoilSensor } from "../entities/SoilSensor";

interface ISoilSensorRepository {
  create({ soilHumidity, id, dateReceived }): Promise<void>;
  listByRange({ initialDate, endDate }): Promise<any>;
  listAverageOnRange({ initialDate, endDate }): Promise<any>;
}

export type { ISoilSensorRepository };
