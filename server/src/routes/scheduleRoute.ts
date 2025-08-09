import { Router } from "express";
import * as scheduleController from "../controllers/scheduleController.ts";

const scheduleRouter = Router();
scheduleRouter.post("/create", scheduleController.createSchedule);
scheduleRouter.get("/get", scheduleController.getSchedule);

export { scheduleRouter };
