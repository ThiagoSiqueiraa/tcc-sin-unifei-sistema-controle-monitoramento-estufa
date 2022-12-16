import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("dht22")
class DHT22 {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @Column()
  date_received: Date;

  constructor(name: string) {
    if (!this._id) {
      this._id = new ObjectId();
    }
  }
}

export { DHT22 };

/* eslint-disable no-underscore-dangle */
