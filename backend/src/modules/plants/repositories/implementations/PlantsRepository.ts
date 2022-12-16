import { getMongoRepository, MongoRepository } from "typeorm";

import { ICreateGeneticDTO } from "../../dtos/ICreateGeneticDTO";
import { Genetic } from "../../entities/Genetic";
import { IPlantsRepository } from "../IPlantsRepository";

class PlantsRepository implements IPlantsRepository {
  private repository: MongoRepository<Genetic>;

  constructor() {
    this.repository = getMongoRepository(Genetic);
  }

  async create({
    _id,
    name,
    strainType,
    productivity,
    height,
    floweringTime,
  }: ICreateGeneticDTO): Promise<void> {
    const genetic = await this.repository.create({
      _id,
      name,
      strainType,
      productivity,
      height,
      floweringTime,
    });

    await this.repository.save(genetic);
  }
  async list(): Promise<Genetic[]> {
    const all = await this.repository.find();
    return all;
  }

  async findById(id: string): Promise<Genetic> {
    const genetic = await this.repository.findOne(id);

    return genetic;
  }
}

export { PlantsRepository };
