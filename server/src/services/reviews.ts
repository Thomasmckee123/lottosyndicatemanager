
import {prisma} from "../utils/prisma"
import bcrypt from "bcrypt"
import { IReviews } from "../interfaces";
//getting reviews by syndicate ID

async function getreviewsBySyndicateId(syndicateId: number) {
    let reviewsBySyndicateId;
  
    try {
      reviewsBySyndicateId = await prisma.user_syndicate_reviews.findMany({
        where: {
          syndicate_id: syndicateId,
        },select:{
            id:true,
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
    const modifiedReviews: IReviews[] = reviewsBySyndicateId.map(
      (x: {
        id: number,
        created_date: Date,
        title: string,
        content: string,
        users:{ 
    first_name: string,
    last_name: string,
        },
        syndicates:{
            name: string,
        }
      }) => ({
        id: x.id,
        createdDate: x.created_date,
        title: x.title,
        content: x.content,
        users:{ 
    firstName: x.users.first_name,
    lastName: x.users.last_name,
        },
        syndicates:{
            name: x.syndicates.name
        }
}))

    console.log(reviewsBySyndicateId);
    return modifiedReviews;
  }

async function createReviewInSyndicate(review: any) {
  try {


  const newReviews = await prisma.user_syndicate_reviews.create({
    data: {
created_date: new Date(),
   title: review.title,
   content: review.content,
   user_id: review.userId,
   syndicate_id: review.syndicateId



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