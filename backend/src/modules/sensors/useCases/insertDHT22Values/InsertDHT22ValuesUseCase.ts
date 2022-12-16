import { inject, injectable } from "tsyringe";

import { ISensorsRepository } from "../../repositories/ISensorsRepository";

interface IRequest {
  humidity: number;
  temperature: number;
  date_received: Date;
}

@injectable()
class InsertDHT22ValuesUseCase {
  constructor(
    @inject("SensorsRepository") private sensorsRepository: ISensorsRepository
  ) {}

  async execute({
    humidity,
    temperature,
    date_received,
  }: IRequest): Promise<void> {
    await this.sensorsRepository.create({
      humidity,
      temperature,
      date_received,
    });
  }
}

export { InsertDHT22ValuesUseCase };
