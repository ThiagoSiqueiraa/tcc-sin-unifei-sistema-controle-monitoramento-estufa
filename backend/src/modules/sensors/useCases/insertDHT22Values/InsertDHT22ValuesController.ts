import { container } from "tsyringe";

import { InsertDHT22ValuesUseCase } from "./InsertDHT22ValuesUseCase";

interface IRequest {
  humidity: number;
  temperature: number;
  date_received: number;
}

class InsertDHT22ValuesController {
  async handle(request: IRequest): Promise<void> {
    const { temperature, humidity, date_received } = request;

    const insertDHT22ValuesUseCase = container.resolve(
      InsertDHT22ValuesUseCase
    );
    await insertDHT22ValuesUseCase.execute({
      humidity,
      temperature,
      date_received: new Date(date_received),
    });
  }
}

export { InsertDHT22ValuesController };
