import { Router } from "express";

import { CreateChartController } from "../modules/charts/useCases/createChart/CreateChartController";
import { ListChartsController } from "../modules/charts/useCases/listCharts/ListChartsController";
import { LoadChartController } from "../modules/charts/useCases/loadChart/LoadChartController";

const chartRoutes = Router();
const createChartController = new CreateChartController();
const loadChartController = new LoadChartController();
const listChartsController = new ListChartsController();

chartRoutes.post("/create", createChartController.handle);
chartRoutes.get("/list", listChartsController.handle);
chartRoutes.get("/show/:chartId", loadChartController.handle);

export { chartRoutes };
