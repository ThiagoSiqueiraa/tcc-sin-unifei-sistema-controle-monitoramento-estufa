import { inject, injectable } from "tsyringe";

import { Device } from "../../entities/Device";
import { IDevicesRepository } from "../../repositories/IDevicesRepository";

@injectable()
class ShowDeviceUseCase {
  constructor(
    @inject("DevicesRepository") private devicesRepository: IDevicesRepository
  ) {}

  async execute(id: string): Promise<Device> {
    const device = await this.devicesRepository.findById(id);
    return device;
  }
}

export { ShowDeviceUseCase };
