import { Request, Response } from "express";
import { container } from "tsyringe";

import { getEndDay, getStartDay } from "../../../../utils";
import { ListAverageTemperatureAndHumidityValuesByRangeUseCase } from "./ListAverageTemperatureAndHumidityValuesByRangeUseCase";

class ListAverageTemperatureAndHumidityValuesByRangeController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { initialDate, endDate } = request.query;
      if (typeof initialDate === "string" && typeof endDate === "string") {
        const averageDHT22ValuesPerRange = container.resolve(
          ListAverageTemperatureAndHumidityValuesByRangeUseCase
        );

        const values = await averageDHT22ValuesPerRange.execute({
          initialDate: getStartDay(initialDate, -3),
          endDate: getEndDay(endDate, -3),
        });

        return response.json(values);
      }
      return response.send(400);
    } catch (e) {
      return response.status(500).json({ message: e.message });
    }
  }
}

export { ListAverageTemperatureAndHumidityValuesByRangeController };
