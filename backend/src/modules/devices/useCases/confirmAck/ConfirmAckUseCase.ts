import { inject, injectable } from "tsyringe";

import { IACKRepository } from "../../repositories/IACKRepository";
import { IDevicesRepository } from "../../repositories/IDevicesRepository";

@injectable()
class ConfirmAckUseCase {
  constructor(
    @inject("ACKRepository")
    private ackRepository: IACKRepository,
    @inject("DevicesRepository")
    private devicesRepository: IDevicesRepository
  ) {}
  async execute(id: string): Promise<void> {
    const ack = await this.ackRepository.findByACKID(id);
    console.log(id);
    if (!ack) {
      throw new Error("ACK not found");
    }

    const device = await this.devicesRepository.findById(
      ack.device_id.toString()
    );

    device.status = !device.status;
    ack.confirmed = true;
    ack.confirmed_at = new Date();
    await this.devicesRepository.save(device);
    console.log(device);
    await this.ackRepository.save(ack);
  }
}

export { ConfirmAckUseCase };
