import { Request, Response } from "express";
import { container } from "tsyringe";

import logger from "../../../../utils/winston-logger";
import { IRequest } from "../../../users/dtos/IRequest";
import { ExecuteRuleDevicesUseCase } from "./ExecuteRuleDevicesUseCase";

interface IRequest {
  facts: {
    airTemperature?: number;
    airHumidity?: number;
  };
}
class ExecuteRuleDevicesController {
  async handle({ facts }: IRequest): Promise<void> {
    const executeRuleDevicesUseCase = container.resolve(
      ExecuteRuleDevicesUseCase
    );
    // cast value as number
    logger.info("execute rule devices");
    await executeRuleDevicesUseCase.execute({ facts });
  }
}

export { ExecuteRuleDevicesController };
