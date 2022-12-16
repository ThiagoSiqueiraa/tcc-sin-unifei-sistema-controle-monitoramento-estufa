import { getMongoRepository, MongoRepository } from "typeorm";

import { IRequest } from "../../dtos/IRequest";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: MongoRepository<User>;

  constructor() {
    this.repository = getMongoRepository(User);
  }

  async create({
    firstName,
    lastName,
    email,
    password,
  }: IRequest): Promise<void> {
    await this.repository.save({
      firstName,
      lastName,
      email,
      password,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}

export { UsersRepository };
