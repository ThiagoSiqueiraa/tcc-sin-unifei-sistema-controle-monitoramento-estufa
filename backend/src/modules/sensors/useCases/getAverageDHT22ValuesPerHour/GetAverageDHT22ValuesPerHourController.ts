import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAverageDHT22ValuesPerHourUseCase } from "./GetAverageDHT22ValuesPerHourUseCase";

class GetAverageDHT22ValuesPerHourController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { initialDate, endDate } = request.query;
      if (typeof initialDate === "string" && typeof endDate === "string") {
        const averageDHT22ValuesPerHourUseCase = container.resolve(
          GetAverageDHT22ValuesPerHourUseCase
        );

        const values = await averageDHT22ValuesPerHourUseCase.execute({
          initialDate: new Date(initialDate),
          endDate: new Date(endDate),
        });

        const mapedResponse = values.map((data: any) => {
          return {
            hour: data._id,
            average: {
              temperature: data.avg_temperature,
              humidity: data.avg_humidity,
            },
          };
        });

        return response.json(mapedResponse);
      }
      return response.send(404);
    } catch (e) {
      return response.status(500).json({ message: e.message });
    }
  }
}

export { GetAverageDHT22ValuesPerHourController };
