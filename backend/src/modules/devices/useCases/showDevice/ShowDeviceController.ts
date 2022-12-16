import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowDeviceUseCase } from "./ShowDeviceUseCase";

class ShowDeviceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showDeviceUseCase = container.resolve(ShowDeviceUseCase);
    const device = await showDeviceUseCase.execute(id);

    return response.json(device);
  }
}

export { ShowDeviceController };
