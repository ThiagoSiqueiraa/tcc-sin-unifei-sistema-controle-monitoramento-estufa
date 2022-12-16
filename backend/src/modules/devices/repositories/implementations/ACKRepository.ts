import { getMongoRepository, MongoRepository } from "typeorm";

import { ACK } from "../../entities/ACK";
import { IACKRepository, ICreateACKDTO } from "../IACKRepository";

class ACKRepository implements IACKRepository {
  private repository: MongoRepository<ACK>;

  constructor() {
    this.repository = getMongoRepository(ACK);
  }
  async findByACKID(ackID: string): Promise<ACK> {
    const ack = await this.repository.findOne({ ackID });
    return ack;
  }
  async create(data: ICreateACKDTO): Promise<void> {
    await this.repository.save({
      ackID: data.ackID,
      device_id: data.device_id,
      confirmed: false,
      created_at: new Date(),
      updated_at: new Date(),
      confirmed_at: null,
      event: data.event,
    });
  }
  async list(): Promise<ACK[]> {
    const res = await this.repository.find();
    return res;
  }
  findById(id: string): Promise<ACK> {
    throw new Error("Method not implemented.");
  }
  findByDeviceId(device_id: string): Promise<ACK> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async save(ack: ACK): Promise<ACK> {
    const res = await this.repository.save(ack);
    return res;
  }
}

export { ACKRepository };
