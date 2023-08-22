import { app } from "../../app";
import request from "supertest";


describe("/boards", () => {
    describe("GET /boards", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/boards")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      describe("GET /boards/games/:gameId", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/boards/games/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });


      describe("POST /boards", () => {
 
        it("respond with 200 containing list of reviews", async () => {
            await request(app)
                .post("/api/boards/games/1/")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({
                   
                   name: 'board.name',

                  
        })                 
    
                .expect(200);
        });
})
      describe("PUT /boards", () => {
 
        it("respond with 200 containing list of reviews", async () => {
            await request(app)
                .put("/api/boards/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({
                  board_name: "board.board_name",
        })                 
    
                .expect(200);
        });
})



    });