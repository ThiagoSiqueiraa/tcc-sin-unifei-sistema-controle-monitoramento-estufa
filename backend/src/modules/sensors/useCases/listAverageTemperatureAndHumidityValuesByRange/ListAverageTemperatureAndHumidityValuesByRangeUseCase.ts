import moment from "moment";
import { inject, injectable } from "tsyringe";

import { DHT22 } from "../../entities/DHT22";
import { ISensorsRepository } from "../../repositories/ISensorsRepository";

interface IRequest {
  initialDate: Date;
  endDate: Date;
}

@injectable()
class ListAverageTemperatureAndHumidityValuesByRangeUseCase {
  constructor(
    @inject("SensorsRepository") private sensorsRepository: ISensorsRepository
  ) {}

  async execute({ initialDate, endDate }: IRequest): Promise<DHT22[]> {
    const dht22SensorValues: any =
      await this.sensorsRepository.listAverageOnRange({
        initialDate,
        endDate,
      });

    dht22SensorValues.dataTemp.data.sort((a, b) => {
      return +moment(a._id, "DD/MM/YYYY") - +moment(b._id, "DD/MM/YYYY");
    });

    dht22SensorValues.dataHum.data.sort((a, b) => {
      return +moment(a._id, "DD/MM/YYYY") - +moment(b._id, "DD/MM/YYYY");
    });

    return dht22SensorValues;
  }
}

export { ListAverageTemperatureAndHumidityValuesByRangeUseCase };
