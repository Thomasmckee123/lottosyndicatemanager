import { app } from "../../app";
import request from "supertest";



describe("/syndicates", () => {
    describe("GET /syndicates", () => {
        it("respond with json containing a list of syndicates", async () => {
            await request(app)
                .get("/api/syndicates")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      describe("GET /syndicates/syndicateId", () => {
        it("respond with json containing a list of syndicates", async () => {
            await request(app)
                .get("/api/syndicates/1")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
      });
      describe("GET /syndicates/name/:name", () => {
        it("respond with json containing a list of syndicates", async () => {
            await request(app)
                .get(`/api/syndicates/name/${"code warriors"}`)
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
    
                .expect(200);
        });
     describe("POST /syndicates/users/:userId", () => {
       it("respond with 200 for successful response", async () => {
            await request(app)
            .post("/api/syndicates/users/1")
            .set("Accept", "application/json")
            .send({
                created_date: new Date(),
                name: "syndicate.name",
                description:"syndicate.description",
                avatar:"syndicate.avatar",
                owner_id: 1,
            })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(200);
        }
      );

      it("respond with 400 for unsuccessful response", async () => {
        await request(app)
        .post("/api/syndicates/users/1")
        .set("Accept", "application/json")
        .send({
            
            description:"syndicate.description",
            avatar:"syndicate.avatar",
            owner_id: 1,
        })
        .expect("Content-type", "application/json; charset=utf-8")
        .expect(400);
    }
  );

    }); 
});
});
