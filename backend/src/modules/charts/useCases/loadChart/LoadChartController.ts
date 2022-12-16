import { Request, Response } from "express";
import moment from "moment";
import { container } from "tsyringe";

import { getStartDay, getEndDay } from "../../../../utils";
import { LoadChartUseCase } from "./LoadChartUseCase";

class LoadChartController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { chartId } = request.params;
    const { initialDate, endDate } = request.query;
    const loadChartUseCase = container.resolve(LoadChartUseCase);

    const chart = await loadChartUseCase.execute({
      chartId,
      initialDate: getStartDay(initialDate as string, -3),
      endDate: getEndDay(endDate as string, -3),
    });

    return response.json(chart);
  }
}

export { LoadChartController };
