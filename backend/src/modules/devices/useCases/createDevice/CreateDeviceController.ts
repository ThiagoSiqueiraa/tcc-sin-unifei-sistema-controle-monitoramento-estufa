import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateDeviceUseCase } from "./CreateDeviceUseCase";

class CreateDeviceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, pin, status, icon } = request.body;

    const createDeviceUseCase = container.resolve(CreateDeviceUseCase);

    await createDeviceUseCase.execute({ name, pin, status, icon });

    return response.send();
  }
}

export { CreateDeviceController };
