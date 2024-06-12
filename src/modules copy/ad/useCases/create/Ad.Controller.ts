import { Request, Response } from "express";
import { container } from "tsyringe";

import { AdCreateUseCase } from "./Ad.UseCase";

export class AdCreateController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, type, animal } = request.body;
    const authenticateUserUseCase = container.resolve(AdCreateUseCase);

    const token = await authenticateUserUseCase.execute({
      title,
      description,
      type,
      animal,
    });

    return response.status(200).json(token);
  }
}
