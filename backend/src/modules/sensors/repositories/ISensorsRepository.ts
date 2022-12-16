import { DHT22 } from "../entities/DHT22";

interface ICreateDHT22DTO {
  id?: string;
  humidity: number;
  temperature: number;
  date_received: Date;
}

interface ISensorsRepository {
  create({ humidity, temperature, date_received }): Promise<void>;
  list(): Promise<DHT22[]>;
  listAveragePerHour({ initialDate, endDate }): Promise<DHT22[]>;
  listAverageOnRange({ initialDate, endDate }): Promise<DHT22[]>;
  listHumidityValuesOnRange({ initialDate, endDate }): Promise<DHT22[]>;
  listTemperatureValuesOnRange({ initialDate, endDate }): Promise<DHT22[]>;
  listMinimumMaximumValuesByRange({ initialDate, endDate }): Promise<DHT22[]>;
  listByRange({ initialDate, endDate }): Promise<DHT22[]>;
  findById(id: string): Promise<DHT22>;
  findMinMaxValues({ initialDate, endDate });
  findLastValue(): Promise<DHT22>;
}

export type { ISensorsRepository, ICreateDHT22DTO };
