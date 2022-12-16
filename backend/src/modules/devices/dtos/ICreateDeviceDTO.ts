import { type } from "os";
import { ObjectID } from "typeorm";

import { Event } from "../entities/Event";
import { Rule } from "../entities/Rule";

interface ICreateDeviceDTO {
  _id?: ObjectID;
  name: string;
  pin: number;
  status: boolean;
  icon: string;
  events?: Event[];
  rules?: Rule[];
}

export type { ICreateDeviceDTO };
