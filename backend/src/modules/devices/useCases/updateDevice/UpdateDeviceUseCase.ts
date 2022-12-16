import { inject, injectable } from "tsyringe";

import { IDevicesRepository } from "../../repositories/IDevicesRepository";

@injectable()
class UpdateDeviceUseCase {
  constructor(
    @inject("DevicesRepository")
    private devicesRepository: IDevicesRepository
  ) {}

  async execute(id: string, name: string, pin: number): Promise<void> {
    const device = await this.devicesRepository.findById(id);
    if (!device) {
      throw new Error("Dispositivo não encontrado");
    }
    device.name = name;
    device.pin = pin;

    await this.devicesRepository.save(device);
  }
}

export { UpdateDeviceUseCase };
