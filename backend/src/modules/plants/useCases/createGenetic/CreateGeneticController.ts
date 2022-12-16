import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateGeneticUseCase } from "./CreateGeneticUseCase";

class CreateGeneticController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, strainType, productivity, height, floweringTime } =
      request.body;

    const createGeneticUseCase = container.resolve(CreateGeneticUseCase);

    await createGeneticUseCase.execute({
      name,
      strainType,
      productivity,
      height,
      floweringTime,
    });

    return response.send();
  }
}

export { CreateGeneticController };
