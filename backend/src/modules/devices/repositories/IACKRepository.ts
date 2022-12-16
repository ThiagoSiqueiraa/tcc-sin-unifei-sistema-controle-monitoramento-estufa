import { ObjectID } from "typeorm";

import { ACK } from "../entities/ACK";

interface ICreateACKDTO {
  ackID: string;
  device_id: ObjectID;
  event: {
    source: string;
    type: string;
    payload: {
      device: {
        id: ObjectID;
        pin: number;
        name: string;
        prevStatus: boolean;
      };
    };
  };
}
interface IACKRepository {
  create(data: ICreateACKDTO): Promise<void>;
  list(): Promise<ACK[]>;
  findById(id: string): Promise<ACK>;
  findByDeviceId(device_id: string): Promise<ACK>;
  delete(id: string): Promise<void>;
  save(ack: ACK): Promise<ACK>;
  findByACKID(ackID: string): Promise<ACK>;
}

export type { IACKRepository, ICreateACKDTO };
