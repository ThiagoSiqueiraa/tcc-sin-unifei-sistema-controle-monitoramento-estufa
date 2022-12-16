import { inject, injectable } from "tsyringe";

import { Genetic } from "../../entities/Genetic";
import { IPlantsRepository } from "../../repositories/IPlantsRepository";

@injectable()
class ListGeneticUseCase {
  constructor(
    @inject("PlantsRepository")
    private plantsRepository: IPlantsRepository
  ) {}

  async execute(): Promise<Genetic[]> {
    const all = await this.plantsRepository.list();
    return all;
  }
}

export { ListGeneticUseCase };
