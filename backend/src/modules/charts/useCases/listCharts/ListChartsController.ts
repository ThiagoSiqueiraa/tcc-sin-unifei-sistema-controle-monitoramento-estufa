import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListChartsUseCase } from "./ListChartsUseCase";

class ListChartsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listChartsUseCase = container.resolve(ListChartsUseCase);

    const charts = await listChartsUseCase.execute();

    return response.json(charts);
  }
}

export { ListChartsController };
