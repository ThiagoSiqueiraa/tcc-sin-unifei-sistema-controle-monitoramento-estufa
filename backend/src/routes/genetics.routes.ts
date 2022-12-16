import { Router, Request, Response } from "express";

import { CreateGeneticController } from "../modules/plants/useCases/createGenetic/CreateGeneticController";
import { ListGeneticController } from "../modules/plants/useCases/listGenetics/ListGeneticController";
import { UpdateGeneticController } from "../modules/plants/useCases/updateGenetic/UpdateGeneticController";

const geneticsRoutes = Router();

const createGeneticController = new CreateGeneticController();
const listGeneticController = new ListGeneticController();
const updateGeneticController = new UpdateGeneticController();

geneticsRoutes.post("/", createGeneticController.handle);

geneticsRoutes.patch("/:id", updateGeneticController.handle);

geneticsRoutes.get("/", listGeneticController.handle);

export { geneticsRoutes };
