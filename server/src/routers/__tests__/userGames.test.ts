import request from "supertest";

import { app } from "../../app";

describe("/userGames", () => {
    describe("GET /userGames", () => {
    it("respond with json containing a list of users", async () => {
        await request(app)
            .get("/api/userGames")
            .set("Accept", "application/json")
            .expect("Content-type", /json/)

            .expect(200);
    });
  });
  });

  describe("GET /userGames/{gameId}", () => {
  
        it("respond with json containing a list of userGames by game Id", async () => {
            await request(app)
                .get("/api/userGames/games/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
 
      describe("GET /userGames/{userId}", () => {
  
        it("respond with json containing a list of userGames by game Id", async () => {
            await request(app)
                .get("/api/userGames/users/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      describe("POST /userGames/games/1/users/1", () => {
                  
        it("respond with json containing a list of userGames by game Id", async () => {

            await request(app)
                .post("/api/userGames/games/1/users/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({ 
                    startDate: new Date(),
                    deposit: 1111,
                    gameId: 1,
                    roleId:1,
                    userId: 1,
                 })   

    
                .expect(200);
        });
        });

 
      describe("PUT /update", () => {
                  
        it("respond with json containing a list of userGames by game Id", async () => {

            await request(app)
                .put("/api/userGames")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({ 
                   
                    deposit: 1111,
                   
                 })   

    
                .expect(200);
        });
   
      });