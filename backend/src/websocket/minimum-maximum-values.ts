import { GetMinMaxValuesOnRangeDateController } from "../modules/sensors/useCases/getMinMaxValuesOnRangeDate/infra/websocket/GetMinMaxValuesOnRangeDateController";

interface IResponse {
  temperature: {
    minimum: number;
    maximum: number;
  };
  humidity: {
    minimum: number;
    maximum: number;
  };
}
const getMinimumMaximumValues = async (): Promise<IResponse | undefined> => {
  const minMaxValuesOnRangeDateController =
    new GetMinMaxValuesOnRangeDateController();

  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);

  const response = await minMaxValuesOnRangeDateController.handle({
    start,
    end,
  });
  if (response[0]) {
    const { temperature, humidity } = response[0];

    return {
      temperature,
      humidity,
    };
  }
  return undefined;
};

export { getMinimumMaximumValues };
