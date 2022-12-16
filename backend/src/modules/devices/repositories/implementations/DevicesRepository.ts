import { getMongoRepository, MongoRepository, UpdateResult } from "typeorm";

import { ICreateDeviceDTO } from "../../dtos/ICreateDeviceDTO";
import { Device } from "../../entities/Device";
import { IDevicesRepository } from "../IDevicesRepository";

class DevicesRepository implements IDevicesRepository {
  private repository: MongoRepository<Device>;

  constructor() {
    this.repository = getMongoRepository(Device);
  }
  findByPin(pin: number): Promise<Device> {
    const device = this.repository.findOne({ pin });
    return device;
  }
  async save(device: Device): Promise<any> {
    const updatedDevice = await this.repository.update(
      { _id: device._id },
      device
    );
    return updatedDevice;
  }

  async create({
    _id,
    name,
    pin,
    status,
    icon,
  }: ICreateDeviceDTO): Promise<void> {
    const device = await this.repository.create({
      _id,
      name,
      pin,
      status,
      icon,
    });
    await this.repository.save(device);
  }

  async list(): Promise<Device[]> {
    const devices = await this.repository.find();

    return devices;
  }

  async findById(id: string): Promise<Device> {
    const device = await this.repository.findOne(id);
    return device;
  }

  async update({
    _id,
    name,
    pin,
    status,
    icon,
    events,
    rules,
  }: ICreateDeviceDTO): Promise<UpdateResult> {
    const device = await this.repository.update(_id, {
      name,
      pin,
      status,
      icon,
      events,
      rules,
    });
    return device;
  }
}

export { DevicesRepository };
