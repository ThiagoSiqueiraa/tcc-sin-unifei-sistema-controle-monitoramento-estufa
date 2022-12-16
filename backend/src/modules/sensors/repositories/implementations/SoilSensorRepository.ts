import { getMongoRepository, MongoRepository } from "typeorm";

import { SoilSensor } from "../../entities/SoilSensor";
import { ISoilSensorRepository } from "../ISoilSensorRepository";

class SoilSensorRepository implements ISoilSensorRepository {
  private repository: MongoRepository<SoilSensor>;

  constructor() {
    this.repository = getMongoRepository(SoilSensor);
  }
  async listByRange({
    initialDate,
    endDate,
  }: {
    initialDate: any;
    endDate: any;
  }): Promise<any> {
    const result = await this.repository.find({
      where: {
        dateReceived: {
          $gte: initialDate,
          $lte: endDate,
        },
      },
    });

    return result;
  }
  async listAverageOnRange({
    initialDate,
    endDate,
  }: {
    initialDate: Date;
    endDate: Date;
  }): Promise<any> {
    const result = await this.repository
      .aggregate([
        {
          $match: {
            dateReceived: {
              $gte: initialDate,
              $lt: endDate,
            },
          },
        },

        {
          $group: {
            _id: "$plantId",
            values: { $push: "$soilHumidity" }, // create array of all encountered "_id"s per "city" bucket - we use the target field name to avoid creation of superfluous fields which would need to be removed from the output later on
            dates: { $push: "$dateReceived" },
          },
        },

        {
          $project: {
            date: {
              $dateToString: {
                format: "%d/%m/%Y",
                date: { $arrayElemAt: ["$dates", 0] },
              },
            },

            averageRating: {
              $avg: {
                $map: {
                  input: "$values",
                  as: "value",
                  in: "$$value",
                },
              },
            },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return result;
  }

  async create({
    soilHumidity,
    id,
    dateReceived,
  }: {
    soilHumidity: any;
    id: any;
    dateReceived: any;
  }): Promise<void> {
    const soilSensorValue = await this.repository.create({
      dateReceived,
      plantId: id,
      soilHumidity,
    });

    await this.repository.save(soilSensorValue);
  }
}

export { SoilSensorRepository };
