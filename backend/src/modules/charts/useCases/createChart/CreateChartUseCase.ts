import { inject, injectable } from "tsyringe";

import { HttpError } from "../../../../errors/HttpError";
import { ICreateChartDTO } from "../../dtos/ICreateChartDTO";
import { IChartRepository } from "../../repositories/IChartRepository";

@injectable()
class CreateChartUseCase {
  constructor(
    @inject("ChartRepository")
    private chartRepository: IChartRepository
  ) {}

  async execute(chartData: ICreateChartDTO): Promise<void> {
    // const chart = this.chartFactory.create(chartData);
    if (!chartData.name || !chartData.variable) {
      throw new HttpError("Campos obrigatórios não preenchidos", 400);
    }
    await this.chartRepository.create(chartData);
  }
}

export { CreateChartUseCase };
