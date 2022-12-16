import { randomUUID } from "crypto";
import { inject, injectable } from "tsyringe";

import { mqtt } from "../../../../server";
import logger from "../../../../utils/winston-logger";
import { IACKRepository } from "../../repositories/IACKRepository";
import { IDevicesRepository } from "../../repositories/IDevicesRepository";

@injectable()
class ChangeStatusDeviceUseCase {
  constructor(
    @inject("DevicesRepository")
    private devicesRepository: IDevicesRepository,
    @inject("ACKRepository")
    private ackRepository: IACKRepository
  ) {}
  async execute(id: string, action: string): Promise<void> {
    const device = await this.devicesRepository.findById(id);
    if (!device) {
      throw new Error("Device not found");
    }
    if (action === "SET_DEVICE_OFF" && device.status === false) {
      logger.info("Não será executado pois o status já é o desejado");
      return;
    }
    if (action === "SET_DEVICE_ON" && device.status === true) {
      logger.info("Não será executado pois o status já é o desejado");
    }

    const ACK_ID = randomUUID();

    this.ackRepository.create({
      ackID: ACK_ID,
      device_id: device._id,
      event: {
        source: "user",
        type: action,
        payload: {
          device: {
            id: device._id,
            name: device.name,
            pin: device.pin,
            prevStatus: device.status,
          },
        },
      },
    });

    mqtt.emit("modulo/rele", {
      pin: device.pin,
      event: action,
      uuid: ACK_ID,
    });
  }
}

export { ChangeStatusDeviceUseCase };
