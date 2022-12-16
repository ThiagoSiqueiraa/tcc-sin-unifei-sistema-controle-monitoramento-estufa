import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { chartRoutes } from "./charts.routes";
import { devicesRoutes } from "./devices.routes";
import { geneticsRoutes } from "./genetics.routes";
import { sensorsRoutes } from "./sensor.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();
routes.use("/genetics", geneticsRoutes);
routes.use("/devices", devicesRoutes);
routes.use("/sensors", sensorsRoutes);
routes.use("/users", usersRoutes);
routes.use("/charts", chartRoutes);
routes.use(authenticateRoutes);

export { routes };
