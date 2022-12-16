import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMinimumMaximumValuesByRangeUseCase } from "./ListMinimumMaximumValuesByRangeUseCase";

class ListAverageTemperatureAndHumidityValuesByRangeController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { initialDate, endDate } = request.query;
      if (typeof initialDate === "string" && typeof endDate === "string") {
        const listMinimumMaximumValuesByRange = container.resolve(
          ListMinimumMaximumValuesByRangeUseCase
        );

        const values = await listMinimumMaximumValuesByRange.execute({
          initialDate: new Date(new Date(initialDate).setHours(0, 0, 0, 0)),
          endDate: new Date(new Date(endDate).setHours(23, 59, 59, 9999)),
        });

        return response.json({ data: values });
      }
      return response.send(400);
    } catch (e) {
      return response.status(500).json({ message: e.message });
    }
  }
}

export { ListAverageTemperatureAndHumidityValuesByRangeController };
