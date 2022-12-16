import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("soilsensor")
class SoilSensor {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  soilHumidity: number;

  @Column()
  plantId: number;

  @Column()
  dateReceived: Date;

  constructor(name: string) {
    if (!this._id) {
      this._id = new ObjectId();
    }
  }
}

export { SoilSensor };

/* eslint-disable no-underscore-dangle */
