import express from "express";
import { SyndicateController } from "../controllers/syndicates";

const SyndicatesRouter = express.Router();

SyndicatesRouter.get("/", SyndicateController.getAllSyndicates);
SyndicatesRouter.get("/user/:userId",SyndicateController.getSyndicatesByUserId);
SyndicatesRouter.post("/create/users/:userId", SyndicateController.createSyndicate);
SyndicatesRouter.put("/update/:syndicateId", SyndicateController.UpdateSyndicateDetails);
SyndicatesRouter.put("/delete/:syndicateId",SyndicateController.deleteSyndicateById);
export { SyndicatesRouter }; 