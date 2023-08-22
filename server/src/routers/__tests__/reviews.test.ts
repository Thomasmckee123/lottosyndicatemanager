import { app } from "../../app";
import request from "supertest";



describe("/reviews", () => {
    describe("GET /reviews", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/reviews/syndicates/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
    
      describe("POST /reviews/syndicates/1/users/1", () => {
        it("respond with 400 containing list of reviews", async () => {
            await request(app)
                .post("/api/reviews/syndicates/1/users/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({
                   
                    content: "review.content",
                    userId: 1,
                    syndicateId:1,
        })                 
    
                .expect(400);
        });
        it("respond with 400 containing list of reviews", async () => {
            await request(app)
                .post("/api/reviews/syndicates/1/users/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({
                   
                    title: "review.title",
                    content: "review.content",
                    userId: 1,
                    syndicateId:1,
        })                 
    
                .expect(200);
        });
      });
    


    });