import request from "supertest";

import { app } from "../../app";

describe("/users", () => {
    describe("GET /users", () => {
    it("respond with json containing a list of users", async () => {
        await request(app)
            .get("/api/users")
            .set("Accept", "application/json")
            .expect("Content-type", /json/)

            .expect(200);
    });
  });

  describe("GET /users/{userId}", () => {
    it("respond with json containing a single user found by id", async () => {
      await request(app)
        .get("/api/users/1")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });
  });

//   describe("POST /users", () => {
//     it("respond with 400 for missing data", async () => {
//       await request(app)
//         .post("/api/users")
//         .set("Accept", "application/json")
//         .send({})
//         .expect("Content-type", "application/json; charset=utf-8")
//         .expect(400);
//     });

//     it("respond with 201 with user created successfully", async () => {
//       const newUser = {
//        email: "newuser@user.com",
//        username: "user1",
//        password: "Password@123"
//       }
//       await request(app)
//         .post("/api/users")
//         .set("Accept", "application/json")
//         .send(newUser)
//         .expect("Content-type","text/plain; charset=utf-8")
//         .expect(201);
//     });
//   });


  describe("PUT /users/:id", () => {
    it("respond with 400 for missing data", async () => {
      await request(app)
        .put("/api/users/1")
        .set("Accept", "application/json")
        .send({
          email: "newuser@user.com",
          username: "user1",
          password: "password"
        })
        .expect("Content-type", "application/json; charset=utf-8")
        .expect(400)
    });

    it("respond with 204 with user updated successfully", async () => {
      const updatedUser = {
        email: "newuser@user.com",
       firstName: "user1",
       lastName: "user2",
        password: "Password@123"
      };
      await request(app)
        .put("/api/users/1")
        .set("Accept", "application/json")
        .send(updatedUser)
        .expect(200);
    });
  });
});
