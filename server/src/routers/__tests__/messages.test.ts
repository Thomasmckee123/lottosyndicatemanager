import { app } from "../../app";
import request from "supertest";


describe("/reviews", () => {
    describe("GET /messages", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/messages")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      describe("GET /messages", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/messages/boards/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      describe("POST /messages", () => {
 
        it("respond with 200 containing list of reviews", async () => {
            await request(app)
                .post("/api/messages/games/1/boards/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({
                    message: 'message.message,',
                    created_date: new Date(),
                   
                  
        })                 
    
                .expect(200);
        });
})

});