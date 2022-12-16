import { ObjectID } from "typeorm";

interface ICreateGeneticDTO {
  _id?: ObjectID;
  name: string;
  strainType: string;
  productivity: number;
  height: number;
  floweringTime: number;
}

export type { ICreateGeneticDTO };
