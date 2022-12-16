import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetHistoryAckDeviceUseCase } from "./GetHistoryAckDeviceUseCase";

class GetHistoryAckDeviceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getHistoryAckDeviceUseCase = container.resolve(
      GetHistoryAckDeviceUseCase
    );

    try {
      const history = await getHistoryAckDeviceUseCase.execute();

      return response.json(history);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}

export { GetHistoryAckDeviceController };
