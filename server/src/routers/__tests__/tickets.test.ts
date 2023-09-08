import { app } from "../../app";
import request from "supertest";

describe("/tickets", () => {
    describe("GET /tickets", () => {
        it("respond with json containing a list of users", async () => {
            await request(app)
                .get("/api/tickets")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      describe("GET /tickets/gameId", () => {
        it("respond with json containing a list of users", async () => {
            await request(app)
                .get("/api/tickets/games/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });

      describe("POST /tickets/games/1/users/1", () => {
                  
        it("respond with error 400 bad request", async () => {

            await request(app)
                .post("/api/tickets/games/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({ 
                    ticket_code: "1111",
                    total_reward_value: 33222,
                    ticket_status_id: 2,
                    game_id: 2,
                 })   

    
                .expect(400);
        });
      });
                  
        it("respond with 200 ", async () => {

            await request(app)
                .post("/api/tickets/games/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({ 
                    ticketCode: "1111",
                    totalRewardValue: 33222,
                    ticketStatusId: 2,
                    gameId: 2,
                 })   

    
                .expect(200);
        });
      });
    

    
 
      describe("PUT /update", () => {
        it("it will respond with json containing a list of userGames by game Id", async () => {
            const updatedTicket = {
                 ticketCode: "1111",
                    totalRewardValue: 33222,
                    ticketStatusId: 2,
                    gameId: 2,
              };
            await request(app)
                .put("/api/tickets/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send(updatedTicket)   

    
                .expect(200);
        });
       
        it("it will respond with a 200 bad request", async () => {

            await request(app)
                .put("/api/tickets/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/).send({ 
                    id: 1,
                    ticketStatusId: 1,
                    totalRewardValue: 11111
                   
                 })   

    
                .expect(400);
        });
      });



    
    
