import { Request, Response } from "express";
import moment from "moment";
import { container } from "tsyringe";

import { getEndDay, getStartDay } from "../../../../utils";
import { GetAverageDHT22ValuesPerRangeUseCase } from "./GetVPDAverageDHT22ValuesPerRangeUseCase";

class GetVPDAverageDHT22ValuesPerRangeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { initialDate, endDate } = request.query;
    const getVPDAverageDHT22ValuesPerRangeUseCase = container.resolve(
      GetAverageDHT22ValuesPerRangeUseCase
    );

    if (typeof initialDate === "string" && typeof endDate === "string") {
      const vpdValuesAverage =
        await getVPDAverageDHT22ValuesPerRangeUseCase.execute({
          initialDate: getStartDay(initialDate, -3),
          endDate: getEndDay(endDate, -3),
        });
      return response.status(200).json(vpdValuesAverage);
    }
    return response.send(400);
  }
}

export { GetVPDAverageDHT22ValuesPerRangeController };
