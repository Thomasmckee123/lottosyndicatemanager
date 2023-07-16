import express from "express";
import { ReviewsController } from "../controllers/reviews";

const ReviewsRouter = express.Router();
ReviewsRouter.get("/syndicates/:syndicateId",ReviewsController.getReviewsBySyndicateId)
ReviewsRouter.post("/create/syndicates/:syndicateId/users/:userId", ReviewsController.createNewReviewOnSyndicate);
ReviewsRouter.delete("/delete/:reviewId",ReviewsController.deleteReviewById);
export { ReviewsRouter }; 