import express from "express";
import { HealthController } from "../controllers/health";

const HealthRouter = express.Router();

HealthRouter.get("/", HealthController.getHealth);

export { HealthRouter }; 