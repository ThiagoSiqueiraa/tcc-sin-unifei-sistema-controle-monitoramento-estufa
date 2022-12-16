import { inject, injectable } from "tsyringe";

import { Event } from "../../entities/Event";
import { IDevicesRepository } from "../../repositories/IDevicesRepository";

interface IRequest {
  id: string;
}

@injectable()
class AddEventToDeviceUseCase {
  constructor(
    @inject("DevicesRepository")
    private devicesRepository: IDevicesRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const device = await this.devicesRepository.findById(id);

    if (!device) {
      throw new Error("O dispositivo não existe");
    }

    device.events = [...device.events, new Event("DEVICE_ENABLE")];

    await this.devicesRepository.update(device);
  }
}

export { AddEventToDeviceUseCase };
