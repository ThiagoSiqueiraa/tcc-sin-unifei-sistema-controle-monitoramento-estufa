import { container } from "tsyringe";

import { IChartRepository } from "../../modules/charts/repositories/IChartRepository";
import { ChartRepository } from "../../modules/charts/repositories/implementations/ChartRepository";
import { IACKRepository } from "../../modules/devices/repositories/IACKRepository";
import { IDevicesRepository } from "../../modules/devices/repositories/IDevicesRepository";
import { ACKRepository } from "../../modules/devices/repositories/implementations/ACKRepository";
import { DevicesRepository } from "../../modules/devices/repositories/implementations/DevicesRepository";
import { PlantsRepository } from "../../modules/plants/repositories/implementations/PlantsRepository";
import { IPlantsRepository } from "../../modules/plants/repositories/IPlantsRepository";
import { IGeneticsPresenter } from "../../modules/plants/useCases/listGenetics/presenters/IGeneticsPresenter";
import { GeneticsPresenter } from "../../modules/plants/useCases/listGenetics/presenters/implementations/GeneticsPresenter";
import { SensorsRepository } from "../../modules/sensors/repositories/implementations/SensorsRepository";
import { SoilSensorRepository } from "../../modules/sensors/repositories/implementations/SoilSensorRepository";
import { ISensorsRepository } from "../../modules/sensors/repositories/ISensorsRepository";
import { ISoilSensorRepository } from "../../modules/sensors/repositories/ISoilSensorRepository";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IPlantsRepository>(
  "PlantsRepository",
  PlantsRepository
);

container.registerSingleton<IGeneticsPresenter>(
  "GeneticsPresenter",
  GeneticsPresenter
);

container.registerSingleton<IDevicesRepository>(
  "DevicesRepository",
  DevicesRepository
);

container.registerSingleton<ISensorsRepository>(
  "SensorsRepository",
  SensorsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ISoilSensorRepository>(
  "SoilSensorRepository",
  SoilSensorRepository
);

container.registerSingleton<IChartRepository>(
  "ChartRepository",
  ChartRepository
);

container.registerSingleton<IACKRepository>("ACKRepository", ACKRepository);
