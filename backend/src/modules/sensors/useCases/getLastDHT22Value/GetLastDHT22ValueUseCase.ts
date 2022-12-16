import { inject, injectable } from "tsyringe";

import { DHT22 } from "../../entities/DHT22";
import { ISensorsRepository } from "../../repositories/ISensorsRepository";

@injectable()
class GetLastDHT22ValueUseCase {
  constructor(
    @inject("SensorsRepository") private sensorsRepository: ISensorsRepository
  ) {}

  async execute(): Promise<DHT22> {
    const lastDHT22Value = await this.sensorsRepository.findLastValue();

    return lastDHT22Value;
  }
}

export { GetLastDHT22ValueUseCase };
