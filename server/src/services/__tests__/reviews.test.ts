
import { IReviews } from '../../interfaces';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { ReviewsService } from '../reviews';

describe("GET /reviews by syndicate id", () => {



    const testReview :any[]= [
        {
            "id": 1,
            "created_date": new Date("2023-07-19T00:00:00.000Z"),
            "title": "Great team!",
            "content": "The Thunderbolts really know what they're doing!",
            "users": {
                "first_name": "John",
                "last_name": "Doe"
            },
            "syndicates": {
                "name": "The Thunderbolts"
            }
        }
      ]
  const testReviewResponse :IReviews[]= [
    {
        "id": 1,
        "createdDate": new Date("2023-07-19T00:00:00.000Z"),
        "title": "Great team!",
        "content": "The Thunderbolts really know what they're doing!",
        "users": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "syndicates": {
            "name": "The Thunderbolts"
        }
    }
]
  
       
        test("get reviews by syndicate id", async () => {
          prismaAsAny.user_syndicate_reviews = {
            findMany: jest.fn().mockResolvedValueOnce(testReview),
          };
          const result = await ReviewsService.getreviewsBySyndicateId(1);
          expect(prisma.user_syndicate_reviews.findMany).toHaveBeenCalledTimes(1);
          expect(result).toEqual(testReviewResponse);
        });
  afterEach(()=>{
      jest.clearAllMocks()
  })
      });
   

      /**
 * creating reviews
 */
    describe("/POST /createReview", () => {
        const testCreateReview = {
            created_date: new Date(),
            title: "review.title",
            content: "review.content",
            user_id: 1,
            syndicate_id: 1
         
         
         
         }
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
        const deleteReview = {
            id: 1 
          
        };
        it('should delete the review by ID', async () => {
            prismaAsAny.user_syndicate_reviews = {
                delete: jest.fn().mockResolvedValueOnce(deleteReview)
            }
       
      
          
          const result = await ReviewsService.deleteReviewsById(deleteReview);
      
          
          expect(prisma.user_syndicate_reviews.delete).toHaveBeenCalledTimes(1);
      
          expect(result).toEqual(deleteReview);
        });
      });