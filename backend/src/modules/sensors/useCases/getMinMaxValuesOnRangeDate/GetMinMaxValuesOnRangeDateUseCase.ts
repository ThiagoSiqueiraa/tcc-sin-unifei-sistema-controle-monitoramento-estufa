import { inject, injectable } from "tsyringe";

import { DHT22 } from "../../entities/DHT22";
import { ISensorsRepository } from "../../repositories/ISensorsRepository";

interface IRequest {
  initialDate: Date;
  endDate: Date;
}
@injectable()
class GetMinMaxValuesOnRangeDateUseCase {
  constructor(
    @inject("SensorsRepository") private sensorsRepository: ISensorsRepository
  ) {}

  async execute({ initialDate, endDate }: IRequest): Promise<any> {
    const dht22SensorValues = await this.sensorsRepository.findMinMaxValues({
      initialDate,
      endDate,
    });

    return dht22SensorValues;
  }
}

export { GetMinMaxValuesOnRangeDateUseCase };
