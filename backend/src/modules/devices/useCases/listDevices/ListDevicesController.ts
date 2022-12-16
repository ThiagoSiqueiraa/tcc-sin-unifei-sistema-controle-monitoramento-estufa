import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListDevicesUseCase } from "./ListDevicesUseCase";

class ListDevicesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listDevicesUseCase = container.resolve(ListDevicesUseCase);
    const devices = await listDevicesUseCase.execute();

    const devicesMaped = devices.map((device) => {
      const eventsCount = {
        DEVICE_ENABLE: 0,
        DEVICE_DISABLE: 0,
      };

      device.events.forEach((event) => {
        eventsCount[event.name] += 1;
      });

      return {
        ...device,
        events: eventsCount,
      };
    });
    return response.json(devicesMaped);
  }
}

export { ListDevicesController };
