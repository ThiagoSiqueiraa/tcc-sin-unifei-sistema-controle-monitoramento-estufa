import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  PrimaryColumn,
} from "typeorm";

import { Event } from "./Event";
import { Rule } from "./Rule";

@Entity("devices")
class Device {
  @PrimaryColumn("text")
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  pin: number;

  @Column("boolean", { default: false })
  status = false;

  @Column()
  icon: string;

  @Column((type) => Event)
  events: Event[];

  @Column((type) => Rule)
  rules: Rule[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.events = [];
  }
}

export { Device };
