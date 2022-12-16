import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { firstName, lastName, email, password } = request.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute({ firstName, lastName, email, password });

      return response.send(201);
    } catch (e) {
      return response.status(500).json({ message: e.message });
    }
  }
}

export { CreateUserController };
