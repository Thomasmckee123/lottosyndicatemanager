import express from "express";
import { SyndicateController } from "../controllers/syndicates";

const SyndicatesRouter = express.Router();

SyndicatesRouter.get("/", SyndicateController.getAllSyndicates);
SyndicatesRouter.get("/user/:userId",SyndicateController.getSyndicatesByUserId);
export { SyndicatesRouter }; 