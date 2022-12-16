/* eslint-disable no-underscore-dangle */

import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("events")
class Event {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(name: string) {
    if (!this._id) {
      this._id = new ObjectId();
    }
    this.name = name;
    this.created_at = new Date();
  }
}

export { Event };
