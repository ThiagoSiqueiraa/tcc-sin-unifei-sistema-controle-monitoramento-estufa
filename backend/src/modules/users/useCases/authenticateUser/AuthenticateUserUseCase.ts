import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { HttpError } from "../../../../errors/HttpError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    firstName: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new HttpError("Email ou senha incorretos!");
    }

    // senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpError("Email ou senha incorretos!");
    }

    // gerar token
    const token = sign({ id: user._id }, "d0f9d0f9d0f9d0f9d0f9d0f9d0f9d0f9", {
      expiresIn: "1d",
    });
    const tokenReturn: IResponse = {
      user: {
        firstName: user.firstName,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
