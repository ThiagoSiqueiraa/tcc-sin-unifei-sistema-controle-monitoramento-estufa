import { getMongoRepository, MongoRepository } from "typeorm";

import { ICreateChartDTO } from "../../dtos/ICreateChartDTO";
import { Chart } from "../../entities/Chart";
import { IChartRepository } from "../IChartRepository";

class ChartRepository implements IChartRepository {
  private repository: MongoRepository<Chart>;

  constructor() {
    this.repository = getMongoRepository(Chart);
  }
  async create(data: ICreateChartDTO): Promise<void> {
    console.log("criando");
    await this.repository.save(data);
  }
  list(): Promise<Chart[]> {
    const charts = this.repository.find();
    return charts;
  }
  findById(id: string): Promise<Chart> {
    const chart = this.repository.findOne(id);
    return chart;
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  save(chart: Chart): Promise<Chart> {
    throw new Error("Method not implemented.");
  }
}

export { ChartRepository };
