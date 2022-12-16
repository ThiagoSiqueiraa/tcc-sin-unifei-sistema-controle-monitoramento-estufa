import { container } from "tsyringe";

import { DHT22 } from "../../entities/DHT22";
import { GetLastDHT22ValueUseCase } from "./GetLastDHT22ValueUseCase";

class GetLastDHT22ValueController {
  async handle(): Promise<DHT22> {
    try {
      const getLastDHT22ValueUseCase = container.resolve(
        GetLastDHT22ValueUseCase
      );

      const lastDHT22Value = await getLastDHT22ValueUseCase.execute();

      return lastDHT22Value;
    } catch (e) {
      return undefined;
    }
  }
}

export { GetLastDHT22ValueController };
