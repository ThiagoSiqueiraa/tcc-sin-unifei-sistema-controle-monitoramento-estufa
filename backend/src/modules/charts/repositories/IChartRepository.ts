import { ICreateChartDTO } from "../dtos/ICreateChartDTO";
import { Chart } from "../entities/Chart";

interface IChartRepository {
  create(data: ICreateChartDTO): Promise<void>;
  list(): Promise<Chart[]>;
  findById(id: string): Promise<Chart>;
  delete(id: string): Promise<void>;
  save(chart: Chart): Promise<Chart>;
}

export type { IChartRepository };
