
import { app } from "../../app";
import request from "supertest";

describe("POST /signup/", () => {
                  
    it("respond with 200, successful request", async () => {

        await request(app)
            .post("/api/signup/")
            .set("Accept", "application/json")
            .expect("Content-type", /json/).send({ 
                first_name: "user.firstName",
        last_name: "user.lastName",
        email: "user.email",
        password: "hashedPassword",
        image: "user.image",
        balance: 0
      },
            )
            .expect(400);
    });
    it("respond with 200, successful request", async () => {

        await request(app)
            .post("/api/signup/")
            .set("Accept", "application/json")
            .expect("Content-type", /json/).send({ 
                firstName: "user.firstName",
        lastName: "user.lastName",
        email: "user.email",
        password: "hashedPassword",
        image: "user.image",
        balance: 0
      },
            )
            .expect(400);
    });
    });
