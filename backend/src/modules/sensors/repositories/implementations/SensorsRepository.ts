import { getMongoRepository, MongoRepository } from "typeorm";

import { DHT22 } from "../../entities/DHT22";
import { ISensorsRepository, ICreateDHT22DTO } from "../ISensorsRepository";

class SensorsRepository implements ISensorsRepository {
  private repository: MongoRepository<DHT22>;

  constructor() {
    this.repository = getMongoRepository(DHT22);
  }
  async listHumidityValuesOnRange({
    initialDate,
    endDate,
  }: {
    initialDate: any;
    endDate: any;
  }): Promise<DHT22[]> {
    const result = await this.repository.find({
      where: {
        date_received: {
          $gte: initialDate,
          $lt: endDate,
        },
      },
      select: ["humidity", "date_received"],
      order: {
        date_received: 1,
      },
    });

    return result;
  }
  async listTemperatureValuesOnRange({
    initialDate,
    endDate,
  }: {
    initialDate: any;
    endDate: any;
  }): Promise<DHT22[]> {
    const result = await this.repository.find({
      where: {
        date_received: {
          $gte: initialDate,
          $lt: endDate,
        },
      },
      select: ["temperature", "date_received"],
      order: {
        date_received: 1,
      },
    });

    return result;
  }
  async listByRange({
    initialDate,
    endDate,
  }: {
    initialDate: Date;
    endDate: Date;
  }): Promise<DHT22[]> {
    const result = await this.repository
      .aggregate([
        {
          $match: {
            date_received: {
              $gte: initialDate,
              $lte: endDate,
            },
          },
        },
      ])
      .toArray();

    return result;
  }
  async listMinimumMaximumValuesByRange({
    initialDate,
    endDate,
  }: {
    initialDate: any;
    endDate: any;
  }): Promise<DHT22[]> {
    const result = await this.repository
      .aggregate([
        {
          $match: {
            date_received: {
              $gte: initialDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%d/%m/%Y", date: "$date_received" },
            },
            minValue: { $min: "$humidity" },
            maxValue: { $max: "$humidity" },
            minValueTemp: { $min: "$temperature" },
            maxValueTemp: { $max: "$temperature" },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return result;
  }
  async listAverageOnRange({
    initialDate,
    endDate,
  }: {
    initialDate: Date;
    endDate: Date;
  }): Promise<any> {
    const resultTemperature = await this.repository
      .aggregate([
        {
          $match: {
            date_received: {
              $gte: initialDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%d/%m/%Y", date: "$date_received" },
            },
            avg: { $avg: "$temperature" },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    const resultHumidity = await this.repository
      .aggregate([
        {
          $match: {
            date_received: {
              $gte: initialDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%d/%m/%Y", date: "$date_received" },
            },
            avg: { $avg: "$humidity" },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return {
      dataTemp: {
        data: resultTemperature,
        type: "Temperatura",
      },
      dataHum: {
        data: resultHumidity,
        type: "Temperatura",
      },
    };
  }
  async listAveragePerHour({ initialDate, endDate }): Promise<DHT22[]> {
    const result = await this.repository
      .aggregate([
        {
          $match: {
            date_received: {
              $gte: initialDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                date: "$date_received",
                timezone: "-0300",
                format: "%H:00",
              },
            },
            avg_temperature: { $avg: "$temperature" },
            avg_humidity: { $avg: "$humidity" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
      .toArray();

    return result;
  }

  async create({
    humidity,
    temperature,
    date_received,
  }: ICreateDHT22DTO): Promise<void> {
    const DHT22 = await this.repository.create({
      date_received,
      humidity,
      temperature,
    });

    await this.repository.save(DHT22);
  }
  async list(): Promise<DHT22[]> {
    const all = await this.repository.find();
    return all;
  }

  async findById(id: string): Promise<DHT22> {
    const DHT22 = await this.repository.findOne(id);

    return DHT22;
  }

  async findMinMaxValues({ initialDate, endDate }): Promise<any> {
    const result = await this.repository
      .aggregate([
        {
          $match: {
            date_received: {
              $gte: initialDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%d/%m/%Y", date: "$date_received" },
            },
            // maximum: {
            //   $max: { temperature: "$temperature", humidity: "$humidity" },
            // },
            // minimum: {
            //   $min: { temperature: "$temperature", humidity: "$humidity" },
            // },
            minimumHumidityValue: { $min: "$humidity" },
            maximumHumidityValue: { $max: "$humidity" },
            minimumTemperatureValue: { $min: "$temperature" },
            maximumTemperatureValue: { $max: "$temperature" },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return result;
  }

  async findLastValue(): Promise<DHT22> {
    const lastValue = await this.repository.findOne({
      order: {
        date_received: -1,
      },
    });

    return lastValue;
  }
}

export { SensorsRepository };
