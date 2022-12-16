import { Request, Response } from "express";
import { container } from "tsyringe";

import { ChangeStatusDeviceUseCase } from "./ChangeStatusDeviceUseCase";

class ChangeStatusDeviceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, status } = request.params;
    const changeStatusDeviceUseCase = container.resolve(
      ChangeStatusDeviceUseCase
    );
    const device = await changeStatusDeviceUseCase.execute(id, status);

    return response.status(200).json(device);
  }
}

export { ChangeStatusDeviceController };
