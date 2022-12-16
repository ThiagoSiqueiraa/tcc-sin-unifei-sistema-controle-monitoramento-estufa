import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddRuleToDeviceUseCase } from "./AddRuleToDeviceUseCase";

class AddRuleToDeviceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { conditions, events, id, name, ruleId } = request.body;
    const addRuleToDeviceUseCase = container.resolve(AddRuleToDeviceUseCase);
    await addRuleToDeviceUseCase.execute({
      conditions,
      events,
      deviceId: id,
      name,
      ruleId,
    });

    return response.status(200).json({
      success: true,
    });
  }
}

export { AddRuleToDeviceController };
