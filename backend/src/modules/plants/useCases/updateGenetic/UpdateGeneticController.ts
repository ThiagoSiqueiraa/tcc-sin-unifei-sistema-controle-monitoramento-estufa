import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateGeneticUseCase } from "./UpdateGeneticUseCase";

class UpdateGeneticController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const { name, strainType, productivity, height, floweringTime } =
        request.body;

      const updateGeneticUseCase = container.resolve(UpdateGeneticUseCase);

      const genetic = await updateGeneticUseCase.execute({
        id,
        name,
        strainType,
        productivity,
        height,
        floweringTime,
      });

      return response.json(genetic);
    } catch (e) {
      return response.status(500).json({ message: e.message });
    }
  }
}

export { UpdateGeneticController };
