import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IRequest } from "../../dtos/IRequest";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    firstName,
    lastName,
    email,
    password,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado!");
    }

    const passwordHash = await hash(password, 8);

    this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
