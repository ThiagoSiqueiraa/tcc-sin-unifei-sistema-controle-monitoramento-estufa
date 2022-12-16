import { inject, injectable } from "tsyringe";

import { DHT22 } from "../../entities/DHT22";
import { ISensorsRepository } from "../../repositories/ISensorsRepository";

interface IRequest {
  initialDate: Date;
  endDate: Date;
}

@injectable()
class ListMinimumMaximumValuesByRangeUseCase {
  constructor(
    @inject("SensorsRepository") private sensorsRepository: ISensorsRepository
  ) {}

  async execute({ initialDate, endDate }: IRequest): Promise<DHT22[]> {
    const minimumMaximumValues =
      await this.sensorsRepository.listMinimumMaximumValuesByRange({
        initialDate,
        endDate,
      });
    return minimumMaximumValues;
  }
}

export { ListMinimumMaximumValuesByRangeUseCase };
