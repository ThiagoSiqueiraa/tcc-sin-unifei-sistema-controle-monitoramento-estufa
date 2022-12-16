/* eslint-disable no-underscore-dangle */

import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("rules")
class Rule {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  rule: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(rule: string) {
    if (!this._id) {
      this._id = new ObjectId();
    }
    this.rule = rule;
    this.created_at = new Date();
  }
}

export { Rule };
