import { inject, injectable } from "tsyringe";

import { IACKRepository } from "../../repositories/IACKRepository";
import { IDevicesRepository } from "../../repositories/IDevicesRepository";

@injectable()
class GetHistoryAckDeviceUseCase {
  constructor(
    @inject("DevicesRepository")
    private devicesRepository: IDevicesRepository,
    @inject("ACKRepository")
    private ackRepository: IACKRepository
  ) {}

  async execute(): Promise<any> {
    const devices = await this.devicesRepository.list();

    const acks = await this.ackRepository.list();
    const ackOnlyWithEvent = acks.filter(
      (ack) => ack.event !== undefined && ack.event.payload.device !== undefined
    );
    const ackDevices = ackOnlyWithEvent.map((ack) => {
      const device = devices.find((d) => d._id.equals(ack.device_id));
      return {
        confirmed: ack.confirmed,
        confirmed_at: ack.created_at,
        event: {
          source: ack.event.source,
          type: ack.event.type,
          payload: {
            ...ack.event.payload,
            device: {
              name: device.name,
              prevStatus: ack.event.payload.device.prevStatus,
              pin: ack.event.payload.device.pin,
            },
          },
        },
      };
    });

    return ackDevices;
  }
}

export { GetHistoryAckDeviceUseCase };
