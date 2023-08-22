import { app } from "../../app";
import request from "supertest";


describe("/gameTypes", () => {
    describe("GET /gameTypes", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/gameTypes")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });

      describe("GET /gameTypes/:id", () => {
        it("respond with json containing a list of reviews", async () => {
            await request(app)
                .get("/api/gameTypes/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      
    });

     
    describe("PUT /gameTypes/:id", () => {
                  
        it("respond with json containing a list of userGames by game Id", async () => {

            await request(app)
                .put("/api/gameTypes/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({ 
                   
                    draw_date: new Date(),
                   
                 })   

    
                .expect(200);
        });
   
      });