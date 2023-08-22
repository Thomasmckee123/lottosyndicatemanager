import request from "supertest";

import { app } from "../../app";
describe("/userSyndicates", () => {
describe("/userSyndicates/syndicates/:syndicateId", () => {
    describe("GET /userSyndicates", () => {
      it("respond with json containing a list of userSyndicates", async () => {
        await request(app)
          .get("/api/userSyndicates/syndicates/1")
          .set("Accept", "application/json")
          .expect("Content-type", /json/)
          .expect(200);
      });
    });
  });



describe("/userSyndicates/user/:userId", () => {
    describe("GET /userSyndicates", () => {
      it("respond with json containing a list of UserSyndicates", async () => {
        await request(app)
          .get("/api/userSyndicates/user/1")
          .set("Accept", "application/json")
          .expect("Content-type", /json/)
          .expect(200);
      });
    });
  });

  describe("/userSyndicates/:userSyndicateId", () => {
    describe("GET /userSyndicates", () => {
      it("respond with json containing a list of userSyndicates", async () => {
        await request(app)
          .get("/api/userSyndicates/userSyndicatesById/1")
          .set("Accept", "application/json")
          .expect("Content-type", /json/)
          .expect(200);
      });
    });
  });
  let server;

  beforeAll(async () => {
    server = app.listen(3000);
  });
  
  afterAll(async () => {
    await server.close();
  });
  


});
