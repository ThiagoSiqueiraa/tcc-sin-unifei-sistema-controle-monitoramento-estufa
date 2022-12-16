import { Router } from "express";

import { GetAverageDHT22ValuesPerHourController } from "../modules/sensors/useCases/getAverageDHT22ValuesPerHour/GetAverageDHT22ValuesPerHourController";
import { GetMinMaxValuesOnRangeDateController } from "../modules/sensors/useCases/getMinMaxValuesOnRangeDate/GetMinMaxValuesOnRangeDateController";
import { GetVPDAverageDHT22ValuesPerRangeController } from "../modules/sensors/useCases/getVPDAverageDHT22ValuesPerRange/GetVPDAverageDHT22ValuesPerRangeController";
import { ListAverageTemperatureAndHumidityValuesByRangeController } from "../modules/sensors/useCases/listAverageTemperatureAndHumidityValuesByRange/ListAverageTemperatureAndHumidityValuesByRangeController";
import { ListSoilSensorValuesAverageByRangeController } from "../modules/sensors/useCases/listSoilSensorValuesAverageByRange/ListSoilSensorValuesAverageByRangeController";

const sensorsRoutes = Router();

const averageDHT22ValuesPerHourController =
  new GetAverageDHT22ValuesPerHourController();
const listAverageTemperatureAndHumidityValuesByRangeController =
  new ListAverageTemperatureAndHumidityValuesByRangeController();

const minMaxValuesOnRageDateController =
  new GetMinMaxValuesOnRangeDateController();

const listSoilSensorValuesAverageByRangeController =
  new ListSoilSensorValuesAverageByRangeController();

const vpdAverageDHT22ValuesPerRangeController =
  new GetVPDAverageDHT22ValuesPerRangeController();

sensorsRoutes.get("/average/hour", averageDHT22ValuesPerHourController.handle);
sensorsRoutes.get(
  "/average",
  listAverageTemperatureAndHumidityValuesByRangeController.handle
);

sensorsRoutes.get("/minimum-maximum", minMaxValuesOnRageDateController.handle);
sensorsRoutes.get(
  "/soil/average",
  listSoilSensorValuesAverageByRangeController.handle
);
sensorsRoutes.get(
  "/vpd/average",
  vpdAverageDHT22ValuesPerRangeController.handle
);

export { sensorsRoutes };
