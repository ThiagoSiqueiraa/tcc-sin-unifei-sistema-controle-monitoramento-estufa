import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("charts")
class Chart {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  size: string;

  @Column()
  source: string;

  @Column()
  variable: string;

  @Column()
  order: number;
}

export { Chart };
