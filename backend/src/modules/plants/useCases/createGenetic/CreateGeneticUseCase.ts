import { inject, injectable } from "tsyringe";

import { ICreateGeneticDTO } from "../../dtos/ICreateGeneticDTO";
import { IPlantsRepository } from "../../repositories/IPlantsRepository";

@injectable()
class CreateGeneticUseCase {
  constructor(
    @inject("PlantsRepository")
    private plantsRepository: IPlantsRepository
  ) {}

  async execute({
    name,
    strainType,
    productivity,
    height,
    floweringTime,
  }: ICreateGeneticDTO): Promise<void> {
    await this.plantsRepository.create({
      name,
      strainType,
      productivity,
      height,
      floweringTime,
    });
  }
}

export { CreateGeneticUseCase };
