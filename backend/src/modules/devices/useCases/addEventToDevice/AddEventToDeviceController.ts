import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddEventToDeviceUseCase } from "./AddEventToDeviceUseCase";

class AddEventToDeviceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const addEventToDeviceUseCase = container.resolve(AddEventToDeviceUseCase);

    await addEventToDeviceUseCase.execute({ id });

    return response.status(201).send();
  }
}

export { AddEventToDeviceController };
