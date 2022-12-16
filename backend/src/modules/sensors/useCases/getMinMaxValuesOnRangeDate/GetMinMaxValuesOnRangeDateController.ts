import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetMinMaxValuesOnRangeDateUseCase } from "./GetMinMaxValuesOnRangeDateUseCase";

class GetMinMaxValuesOnRangeDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { initialDate, endDate } = request.query;
      if (typeof initialDate === "string" && typeof endDate === "string") {
        const getMinMaxValuesOnRangeDateUseCase = container.resolve(
          GetMinMaxValuesOnRangeDateUseCase
        );

        const values = await getMinMaxValuesOnRangeDateUseCase.execute({
          initialDate: new Date(initialDate),
          endDate: new Date(endDate),
        });

        const mappedResponse = values.map((value) => {
          return {
            date: value._id,
            temperature: {
              minimum: value.minimumTemperatureValue,
              maximum: value.maximumTemperatureValue,
            },
            humidity: {
              minimum: value.minimumHumidityValue,
              maximum: value.maximumHumidityValue,
            },
          };
        });

        return response.json(mappedResponse);
      }
      return response.sendStatus(400);
    } catch (e) {
      return response.status(500).json({ message: e.message });
    }
  }
}

export { GetMinMaxValuesOnRangeDateController };
