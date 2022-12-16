import { container, inject, injectable } from "tsyringe";

import { HttpError } from "../../../../errors/HttpError";
import { ICreateDeviceDTO } from "../../dtos/ICreateDeviceDTO";
import { IDevicesRepository } from "../../repositories/IDevicesRepository";
import { AddEventToDeviceUseCase } from "../addEventToDevice/AddEventToDeviceUseCase";

@injectable()
class CreateDeviceUseCase {
  constructor(
    @inject("DevicesRepository") private deviceRepository: IDevicesRepository
  ) {}

  async execute({ icon, name, status, pin }: ICreateDeviceDTO): Promise<void> {
    const deviceFound = await this.deviceRepository.findByPin(pin);

    if (pin === 2 || pin === 3) {
      throw new HttpError("Pinos utilizados pelo sistema.", 400);
    }
    if (deviceFound) {
      throw new HttpError(
        "Erro ao cadastrar com o pino inserido, há um dispositivo já cadastrado com o mesmo pino."
      );
    }

    await this.deviceRepository.create({ icon, name, status, pin });
    // const addEventToDeviceUseCase = container.resolve(AddEventToDeviceUseCase);
    // await addEventToDeviceUseCase.execute("62c8d62bac6e922086504aca");
  }
}

export { CreateDeviceUseCase };
