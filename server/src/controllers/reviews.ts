import { Request, Response } from "express";
import { ReviewsService } from "../services/reviews";

async function getReviewsBySyndicateId(req: Request, res: Response) {
    try {
      const syndicateId = Number(req.params["syndicateId"]);
      const reviews = await ReviewsService.getreviewsBySyndicateId(syndicateId);
      console.log(reviews)
      return res.status(200).json(reviews);
    } catch (error) {
 
      res.status(500).json({ "Cannot access database": error });
    }
  }

  async function createNewReviewOnSyndicate(req: Request, res: Response) {
    try {
      const newReview = {...req.body,
      created_date: new Date(),
      userId: Number(req.params.userId),
      syndicate_id: Number(req.params.syndicateId)
      
      
      
      };
      //creating review
      const createdReview = await ReviewsService.createReviewInSyndicate(newReview);
      return res.status(200).json(createdReview);
    } catch (error) {
      res.status(500).json("Could not create review.");
    }
  }
//deleting review
async function deleteReviewById(req: Request, res: Response) {
    const reviewId = Number(req.params.reviewId);
  
    const deletedReviews = await ReviewsService.deleteReviewsById(reviewId);
    if (!deletedReviews) {
      return res.status(500).json("Cannot delete review");
    }
    return res.status(200).json(deletedReviews);
  }




  const ReviewsController = {deleteReviewById, getReviewsBySyndicateId,createNewReviewOnSyndicate}
export {ReviewsController};