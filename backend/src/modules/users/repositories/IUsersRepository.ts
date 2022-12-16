import { type } from "os";

import { IRequest } from "../dtos/IRequest";
import { User } from "../entities/User";

interface IUsersRepository {
  create({ firstName, lastName, email, password }: IRequest): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export type { IUsersRepository };
