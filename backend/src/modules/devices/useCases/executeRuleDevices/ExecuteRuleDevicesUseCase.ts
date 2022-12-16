import { randomUUID } from "crypto";
import { Engine, Rule as RuleEngine } from "json-rules-engine";
import { inject, injectable } from "tsyringe";

import { mqtt } from "../../../../server";
import logger from "../../../../utils/winston-logger";
import { IACKRepository } from "../../repositories/IACKRepository";
import { IDevicesRepository } from "../../repositories/IDevicesRepository";

interface IRequest {
  facts: {
    airTemperature?: number;
    airHumidity?: number;
  };
}

@injectable()
class ExecuteRuleDevicesUseCase {
  constructor(
    @inject("DevicesRepository")
    private devicesRepository: IDevicesRepository,
    @inject("ACKRepository")
    private ackRepository: IACKRepository
  ) {}

  async execute({ facts }: IRequest): Promise<void> {
    const devices = await this.devicesRepository.list();

    const engine = new Engine();
    // adicionar rules na engine
    devices.forEach((device) => {
      if (device.rules !== undefined && device.rules.length > 0) {
        device.rules.forEach((rule) => {
          const ruleCreated = new RuleEngine(rule.rule);
          engine.addRule(ruleCreated);
        });
      }
    });

    engine.run(facts).then(({ events }) => {
      events.map(async (event) => {
        const device = await this.devicesRepository.findById(
          event.params.deviceId
        );
        const { trigger } = event.params;
        trigger.forEach(async (item) => {
          if (item.event_type === "SET_DEVICE_OFF" && device.status === false) {
            logger.info("Não será executado pois o status já é o desejado");
            return;
          }
          if (item.event_type === "SET_DEVICE_ON" && device.status === true) {
            logger.info("Não será executado pois o status já é o desejado");
            return;
          }

          const ACK_ID = randomUUID();

          this.ackRepository.create({
            ackID: ACK_ID,
            device_id: device._id,
            event: {
              source: "system",
              type: item.event_type,
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
            event: item.event_type,
            uuid: ACK_ID,
          });
        });
      });
    });
  }
}

export { ExecuteRuleDevicesUseCase };
