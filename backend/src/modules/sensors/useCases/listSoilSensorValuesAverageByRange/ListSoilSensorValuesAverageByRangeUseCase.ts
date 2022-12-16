import { inject, injectable } from "tsyringe";

import { ISoilSensorRepository } from "../../repositories/ISoilSensorRepository";
import { ListSoilSensorValuesAverageByRangePresenter } from "./ListSoilSensorValuesAverageByRangePresenter";

interface IRangeDateDTO {
  initialDate: Date;
  endDate: Date;
}

interface ISoilSensorValuesAverageByRangeResponseDTO {
  soilHumidity: number;
  id: number;
  dateReceived: Date;
}
@injectable()
class ListSoilSensorValuesAverageByRangeUseCase {
  constructor(
    @inject("SoilSensorRepository")
    private soilSensorValuesRepository: ISoilSensorRepository
  ) {}

  async execute(
    data: IRangeDateDTO
  ): Promise<ISoilSensorValuesAverageByRangeResponseDTO> {
    const soilSensorValues = await this.soilSensorValuesRepository.listByRange(
      data
    );

    const soilSensorValuesPresenter =
      new ListSoilSensorValuesAverageByRangePresenter();

    const response = soilSensorValuesPresenter.transform(soilSensorValues);
    return response;
  }
}

export { ListSoilSensorValuesAverageByRangeUseCase };
