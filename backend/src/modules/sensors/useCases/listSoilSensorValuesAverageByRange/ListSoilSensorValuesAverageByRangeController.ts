import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSoilSensorValuesAverageByRangeUseCase } from "./ListSoilSensorValuesAverageByRangeUseCase";

class ListSoilSensorValuesAverageByRangeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { initialDate, endDate } = request.query;
    const listSoilSensorValuesAverageByRangeUseCase = container.resolve(
      ListSoilSensorValuesAverageByRangeUseCase
    );

    if (typeof initialDate === "string" && typeof endDate === "string") {
      const initialDateAux = new Date(initialDate);
      const endDateAux = new Date(endDate);

      const soilSensorValuesAverage =
        await listSoilSensorValuesAverageByRangeUseCase.execute({
          initialDate: new Date(
            initialDateAux.setDate(initialDateAux.getDate() - 1)
          ),
          endDate: new Date(endDateAux.setDate(endDateAux.getDate() + 1)),
        });

      return response.status(200).json(soilSensorValuesAverage);
    }
    return response.send(400);
  }
}

export { ListSoilSensorValuesAverageByRangeController };
