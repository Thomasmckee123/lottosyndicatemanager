import { IReviews } from "../../interfaces";
import { IUserSyndicate } from '../../interfaces/syndicates';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { ReviewsService } from "../reviews";
import { SyndicateService } from '../syndicates';
/**
 * reviews by syndicate Id
 */
 const reviewsBySyndicateId: IReviews[] =[{
    id: 1,
    created_date: new Date(),
    title: "review",
    content:"good stuff",
    users:{
first_name: "Thomas",
last_name: "McKee",
    },
    syndicates:{
        
        name: "syndicate",
    }
 }]
 /** 
  * testing creating a review
  * 
  */
 const testCreateReview = {
    created_date: new Date(),
    title: "review.title",
    content: "review.content",
    user_id: 1,
    syndicate_id: 1
 
 
 
 }

 const deleteReview = {
      id: 1 
    
  };
  
 /**
     * getting reviews by syndicate id
     */
  describe("/GET/SyndicateById", () => {
    it("should return a syndicate with their id", async () => {
      prismaAsAny.user_syndicate_reviews = {
        findMany: jest.fn().mockReturnValueOnce(reviewsBySyndicateId),
      };
      const result = await ReviewsService.getreviewsBySyndicateId(1);
   
     
      expect(prisma.user_syndicate_reviews.findMany).toHaveBeenCalledTimes(1);
      
      if(result){
      expect(result).toEqual(reviewsBySyndicateId);
    }
    });
  });
  /**
 * creating reviews
 */
    describe("/POST /createReview", () => {
 
        it("should create a new review", async () => {
          prismaAsAny.user_syndicate_reviews = { 
            create: jest.fn().mockResolvedValueOnce(testCreateReview),
        };
         console.log(testCreateReview);
      const result = await ReviewsService.createReviewInSyndicate(testCreateReview);
      console.log("hi"+result)
      expect(prisma.user_syndicate_reviews.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testCreateReview.created_date);
          
        });
      
      
      });

      /**
       * deleting a ticket
       */
      describe('deleteReviewsById', () => {
        it('should delete the review by ID', async () => {
            prismaAsAny.user_syndicate_reviews = {
                delete: jest.fn().mockResolvedValueOnce(deleteReview)
            }
       
      
          
          const result = await ReviewsService.deleteReviewsById(deleteReview);
      
          
          expect(prisma.user_syndicate_reviews.delete).toHaveBeenCalledTimes(1);
      
          expect(result).toEqual(deleteReview);
        });
      });