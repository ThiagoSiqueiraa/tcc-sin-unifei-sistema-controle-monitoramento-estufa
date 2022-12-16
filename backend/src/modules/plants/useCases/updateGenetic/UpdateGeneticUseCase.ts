import { inject, injectable } from "tsyringe";

import { IPlantsRepository } from "../../repositories/IPlantsRepository";

interface IRequest {
  id: string;
  name: string;
  strainType: string;
  productivity: number;
  height: number;
  floweringTime: number;
}
@injectable()
class UpdateGeneticUseCase {
  constructor(
    @inject("PlantsRepository") private plantsRepository: IPlantsRepository
  ) {}

  async execute({
    id,
    name,
    strainType,
    productivity,
    height,
    floweringTime,
  }: IRequest): Promise<void> {
    const genetic = await this.plantsRepository.findById(id);

    if (!genetic) {
      throw new Error("A genetica informada não existe.");
    }

    genetic.name = name;
    genetic.strainType = strainType;
    genetic.productivity = productivity;
    genetic.height = height;
    genetic.floweringTime = floweringTime;

    await this.plantsRepository.create(genetic);
  }
}

export { UpdateGeneticUseCase };
