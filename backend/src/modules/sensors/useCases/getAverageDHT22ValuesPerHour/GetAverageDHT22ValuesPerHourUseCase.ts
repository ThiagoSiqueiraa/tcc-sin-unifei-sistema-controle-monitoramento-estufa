import { inject, injectable } from "tsyringe";

import { DHT22 } from "../../entities/DHT22";
import { ISensorsRepository } from "../../repositories/ISensorsRepository";

interface IRequest {
  initialDate: Date;
  endDate: Date;
}
@injectable()
class GetAverageDHT22ValuesPerHourUseCase {
  constructor(
    @inject("SensorsRepository") private sensorsRepository: ISensorsRepository
  ) {}

  async execute({ initialDate, endDate }: IRequest): Promise<DHT22[]> {
    const dht22SensorValues = await this.sensorsRepository.listAveragePerHour({
      initialDate,
      endDate,
    });

    return dht22SensorValues;
  }
}

export { GetAverageDHT22ValuesPerHourUseCase };
