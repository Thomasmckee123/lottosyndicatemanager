import { app } from "../../app";
import request from "supertest";


describe("/games", () => {
    describe("GET /games", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/games")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      describe("GET /games/gameTypes/:id/syndicates/:id", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/games/gameTypes/1/syndicates/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });

      describe("GET /games/syndicates/:id", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/syndicates/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      describe("GET /games/archivedGames/:userId", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/games/archivedGames/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });


      describe("GET /games/archivedGames/:userId", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/games/archivedGames/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });

      describe("PUT /games", () => {
 
        it("respond with 200 containing list of reviews", async () => {
            await request(app)
                .put("/api/games/gameTypes/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({
maximumPlayers: 0,                   
                  
        })                 
    
                .expect(200);
        });
})

    });