import { inject, injectable } from "tsyringe";

import { Device } from "../../entities/Device";
import { IDevicesRepository } from "../../repositories/IDevicesRepository";

@injectable()
class ListDevicesUseCase {
  constructor(
    @inject("DevicesRepository") private devicesRepository: IDevicesRepository
  ) {}

  async execute(): Promise<Device[]> {
    const all = await this.devicesRepository.list();

    return all;
  }
}

export { ListDevicesUseCase };
