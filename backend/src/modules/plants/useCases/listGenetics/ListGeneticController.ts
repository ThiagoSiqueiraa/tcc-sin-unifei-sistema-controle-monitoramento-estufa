import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListGeneticPresenter } from "./ListGeneticPresenter";
import { ListGeneticUseCase } from "./ListGeneticUseCase";

class ListGeneticController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listGeneticUseCase = container.resolve(ListGeneticUseCase);

    const all = await listGeneticUseCase.execute();

    const listGeneticPresenter = container.resolve(ListGeneticPresenter);

    const allFormated = listGeneticPresenter.format(all);

    return response.json(all);
  }
}

export { ListGeneticController };
