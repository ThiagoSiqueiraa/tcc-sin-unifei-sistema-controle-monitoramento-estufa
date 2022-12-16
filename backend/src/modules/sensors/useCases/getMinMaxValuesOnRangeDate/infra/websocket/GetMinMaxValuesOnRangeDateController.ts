import { container } from "tsyringe";

import { GetMinMaxValuesOnRangeDateUseCase } from "../../GetMinMaxValuesOnRangeDateUseCase";

interface IRequest {
  start: Date;
  end: Date;
}

interface IResponse {
  date: string;
  temperature: {
    minimum: number;
    maximum: number;
  };
  humidity: {
    minimum: number;
    maximum: number;
  };
}

class GetMinMaxValuesOnRangeDateController {
  async handle({ start, end }: IRequest): Promise<IResponse[]> {
    try {
      const getMinMaxValuesOnRangeDateUseCase = container.resolve(
        GetMinMaxValuesOnRangeDateUseCase
      );

      const values = await getMinMaxValuesOnRangeDateUseCase.execute({
        initialDate: new Date(start),
        endDate: new Date(end),
      });

      const mappedResponse: IResponse[] = values.map((value) => {
        return {
          date: value._id,
          temperature: {
            minimum: value.minimumTemperatureValue,
            maximum: value.maximumTemperatureValue,
          },
          humidity: {
            minimum: value.minimumHumidityValue,
            maximum: value.maximumHumidityValue,
          },
        };
      });
      return mappedResponse;
    } catch (e) {
      console.log(e);
    }
  }
}

export { GetMinMaxValuesOnRangeDateController };
