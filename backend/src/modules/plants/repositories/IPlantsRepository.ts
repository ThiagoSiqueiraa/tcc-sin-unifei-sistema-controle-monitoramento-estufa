import { ICreateGeneticDTO } from "../dtos/ICreateGeneticDTO";
import { Genetic } from "../entities/Genetic";

interface ICreatePlantDTO {
  id?: string;
  name: string;
  strainType: string;
  productivity: number;
  height: number;
  floweringTime: number;
}

interface IPlantsRepository {
  create(data: ICreateGeneticDTO): Promise<void>;
  list(): Promise<Genetic[]>;
  findById(id: string): Promise<Genetic>;
}

export type { IPlantsRepository, ICreatePlantDTO };
