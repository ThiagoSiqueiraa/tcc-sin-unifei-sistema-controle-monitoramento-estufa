import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("genetics")
class Genetic {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  strainType: string;

  @Column()
  productivity: number;

  @Column()
  height: number;

  @Column()
  floweringTime: number;
}

export { Genetic };
