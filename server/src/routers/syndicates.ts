import express from "express";
import { SyndicateController } from "../controllers/syndicates";

const SyndicatesRouter = express.Router();

SyndicatesRouter.get("/", SyndicateController.getAllSyndicates);

export { SyndicatesRouter }; 