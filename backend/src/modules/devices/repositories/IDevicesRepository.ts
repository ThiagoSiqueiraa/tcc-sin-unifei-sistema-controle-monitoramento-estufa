import { type } from "os";
import { ObjectID, UpdateResult } from "typeorm";

import { ICreateDeviceDTO } from "../dtos/ICreateDeviceDTO";
import { Device } from "../entities/Device";
import { Event } from "../entities/Event";

interface IDevicesRepository {
  create(data: ICreateDeviceDTO): Promise<void>;
  list(): Promise<Device[]>;
  save(device: Device): Promise<Device>;
  findById(id: string): Promise<Device>;
  findByPin(pin: number): Promise<Device>;
  update(data: ICreateDeviceDTO): Promise<UpdateResult>;
}

export type { IDevicesRepository };
