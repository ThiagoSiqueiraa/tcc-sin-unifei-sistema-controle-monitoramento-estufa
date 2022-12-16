import { ObjectId } from "mongodb";
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("ACK")
class ACK {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column("text")
  ackID: string;

  @Column()
  confirmed: boolean;

  @Column()
  device_id: ObjectID;

  @Column()
  event: {
    source: string;
    type: string;
    payload: {
      pin: number;
      value: number;
    };
  };
  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  confirmed_at: Date;

  constructor(ackID: string, deviceID: ObjectID) {
    if (!this._id) {
      this._id = new ObjectId();
    }

    this.ackID = ackID;
    this.device_id = deviceID;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.confirmed_at = null;
    this.confirmed = false;
  }
}

export { ACK };
