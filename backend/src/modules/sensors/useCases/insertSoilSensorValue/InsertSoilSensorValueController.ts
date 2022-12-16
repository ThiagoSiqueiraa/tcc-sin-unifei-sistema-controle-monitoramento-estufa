import { container } from "tsyringe";

import { InsertSoilSensorValueUseCase } from "./InsertSoilSensorValueUseCase";

interface IRequest {
  soilHumidity: number;
  id: number;
  dateReceived: number;
}

class InsertSoilSensorValueController {
  async handle(request: IRequest): Promise<void> {
    const { soilHumidity, id, dateReceived } = request;

    const insertSoilSensorValueUseCase = container.resolve(
      InsertSoilSensorValueUseCase
    );

    await insertSoilSensorValueUseCase.execute({
      soilHumidity,
      id,
      dateReceived: new Date(dateReceived),
    });
  }
}

export { InsertSoilSensorValueController };
