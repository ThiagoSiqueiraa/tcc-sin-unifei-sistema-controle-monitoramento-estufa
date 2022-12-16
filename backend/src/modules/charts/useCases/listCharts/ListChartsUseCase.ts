import { inject, injectable } from "tsyringe";

import { Chart } from "../../entities/Chart";
import { IChartRepository } from "../../repositories/IChartRepository";

@injectable()
class ListChartsUseCase {
  constructor(
    @inject("ChartRepository")
    private chartRepository: IChartRepository
  ) {}

  async execute(): Promise<Chart[]> {
    const charts = await this.chartRepository.list();
    return charts;
  }
}

export { ListChartsUseCase };
