import { inject, injectable } from "tsyringe";

import { HttpError } from "../../../../errors/HttpError";
import { Rule } from "../../entities/Rule";
import { IDevicesRepository } from "../../repositories/IDevicesRepository";

interface IRequest {
  events: any;
  conditions: any;
  deviceId: string;
  name: string;
  ruleId: string;
}

@injectable()
class AddRuleToDeviceUseCase {
  constructor(
    @inject("DevicesRepository")
    private devicesRepository: IDevicesRepository
  ) {}

  async execute({
    events,
    conditions,
    deviceId,
    name,
    ruleId,
  }: IRequest): Promise<void> {
    if (conditions.any.length === 0 || name === "" || events.length === 0) {
      throw new HttpError("Campos obrigatórios faltando", 400);
    }
    if (deviceId === undefined) {
      throw new HttpError("ID do dispositivo não informado");
    }

    const device = await this.devicesRepository.findById(deviceId);

    if (!device) {
      throw new Error("O dispositivo não existe");
    }

    // const conditionsMapped = conditions.map((condition) => {
    //   return {
    //     fact: condition.fact,
    //     operator: condition.operator,
    //     value: Number(condition.value),
    //   };
    // });

    const rule = JSON.stringify({
      conditions,
      event: {
        type: "multiple-events",
        params: {
          trigger: events,
          deviceId,
        },
      },
      name,
    });
    if (device.rules === undefined || device.rules.length === 0) {
      device.rules = [];
    }

    if (ruleId !== undefined) {
      const ruleIndex = device.rules.findIndex(
        (rule) => String(rule._id) === ruleId
      );
      device.rules[ruleIndex] = new Rule(rule);
    } else {
      device.rules.push(new Rule(rule));
    }

    // if (device.rules.find((elem) => elem.rule === rule)) {
    //   throw new HttpError("Regra já cadastrada");
    // }

    // device.rules = [...device.rules, new Rule(rule)];
    await this.devicesRepository.update(device);
  }
}

export { AddRuleToDeviceUseCase };
