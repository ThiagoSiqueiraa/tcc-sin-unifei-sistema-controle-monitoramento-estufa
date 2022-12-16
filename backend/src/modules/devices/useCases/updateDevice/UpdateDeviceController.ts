import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateDeviceUseCase } from "./UpdateDeviceUseCase";

class UpdateDeviceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, pin } = request.body;

    const updateDeviceUseCase = container.resolve(UpdateDeviceUseCase);
    await updateDeviceUseCase.execute(id, name, pin);

    return response.status(204).send();
  }
}

export { UpdateDeviceController };
