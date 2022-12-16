import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateChartUseCase } from "./CreateChartUseCase";

class CreateChartController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, source, variable, title, size } = request.body;
    const createChartUseCase = container.resolve(CreateChartUseCase);
    console.log(variable);
    await createChartUseCase.execute({
      name: title,
      type,
      size,
      source,
      variable,
    });

    return response.status(201).send();
  }
}

export { CreateChartController };
