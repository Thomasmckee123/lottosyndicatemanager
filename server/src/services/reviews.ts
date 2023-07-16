
import {prisma} from "../utils/prisma"
import bcrypt from "bcrypt"

//getting reviews by syndicate ID

async function getreviewsBySyndicateId(syndicateId: number) {
    let reviewsBySyndicateId;
  
    try {
      reviewsBySyndicateId = await prisma.user_syndicate_reviews.findMany({
        where: {
          syndicate_id: syndicateId,
        },select:{
            created_date: true,
            title: true,
            content: true,
            users:{ select:{
first_name: true,
last_name: true
            },},
            syndicates:{
                select:{

                name: true,
            }
            }
        }
      });
    } catch (error) {
      throw Error("Cannot get messages by game id", error);
    }
  
    return reviewsBySyndicateId;
  }

async function createReviewInSyndicate(review: any) {
  try {


  const newReviews = await prisma.user_syndicate_reviews.create({
    data: {
   created_date: review.created_date,
   title: review.title,
   content: review.content,



    },
  });
    return newReviews.created_date;
  } catch(error) {
    console.log(error);
    throw Error("Cannot create review");
  }
} 

async function deleteReviewsById(reviewId) {
    try {
  
      const deletedReview = await prisma.user_syndicate_reviews.delete({
        where: {
          id: reviewId
        },
      });
      
      return deletedReview;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  const ReviewsService = {getreviewsBySyndicateId, createReviewInSyndicate, deleteReviewsById};
export{ReviewsService};