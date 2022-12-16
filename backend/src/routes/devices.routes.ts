import { Router } from "express";

import { AddEventToDeviceController } from "../modules/devices/useCases/addEventToDevice/AddEventToDeviceController";
import { AddRuleToDeviceController } from "../modules/devices/useCases/addRuleToDevice/AddRuleToDeviceController";
import { ChangeStatusDeviceController } from "../modules/devices/useCases/changeStatusDevice/ChangeStatusDeviceController";
import { CreateDeviceController } from "../modules/devices/useCases/createDevice/CreateDeviceController";
import { ExecuteRuleDevicesController } from "../modules/devices/useCases/executeRuleDevices/ExecuteRuleDevicesController";
import { GetHistoryAckDeviceController } from "../modules/devices/useCases/getHistoryAckDevice/GetHistoryAckDeviceController";
import { ListDevicesController } from "../modules/devices/useCases/listDevices/ListDevicesController";
import { ShowDeviceController } from "../modules/devices/useCases/showDevice/ShowDeviceController";
import { UpdateDeviceController } from "../modules/devices/useCases/updateDevice/UpdateDeviceController";

const devicesRoutes = Router();

const createDeviceControll = new CreateDeviceController();
const listDevicesController = new ListDevicesController();
const showDeviceController = new ShowDeviceController();
const addEventToDeviceController = new AddEventToDeviceController();
const addRuleToDeviceController = new AddRuleToDeviceController();
const executeRuleDevicesController = new ExecuteRuleDevicesController();
const changeStatusDeviceController = new ChangeStatusDeviceController();
const updateDeviceController = new UpdateDeviceController();
const getHistoryAckDeviceController = new GetHistoryAckDeviceController();

devicesRoutes.post("/", createDeviceControll.handle);
devicesRoutes.get("/", listDevicesController.handle);
devicesRoutes.get("/:id", showDeviceController.handle);
devicesRoutes.put("/edit/:id", updateDeviceController.handle);
// devicesRoutes.post("/:id", addEventToDeviceController.handle);
devicesRoutes.put("/:id/:status", changeStatusDeviceController.handle);
devicesRoutes.post("/rules", addRuleToDeviceController.handle);
devicesRoutes.post("/rules/execute", executeRuleDevicesController.handle);
devicesRoutes.get("/ack/history", getHistoryAckDeviceController.handle);
export { devicesRoutes };
