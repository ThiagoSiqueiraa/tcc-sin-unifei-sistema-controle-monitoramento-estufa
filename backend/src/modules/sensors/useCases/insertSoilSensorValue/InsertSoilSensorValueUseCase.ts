import { inject, injectable } from "tsyringe";

import { ISoilSensorRepository } from "../../repositories/ISoilSensorRepository";

interface IRequest {
  soilHumidity: number;
  id: number;
  dateReceived: Date;
}

@injectable()
class InsertSoilSensorValueUseCase {
  constructor(
    @inject("SoilSensorRepository")
    private soilSensorRepository: ISoilSensorRepository
  ) {}

  async execute({ soilHumidity, id, dateReceived }: IRequest): Promise<void> {
    await this.soilSensorRepository.create({
      soilHumidity,
      id,
      dateReceived,
    });
  }
}

export { InsertSoilSensorValueUseCase };
