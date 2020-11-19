import request from "supertest";
import app from "../src/app";

describe("GET /contagens/v1/", () => {
  it("should return 200 & summary", async (done) => {
    request(app)
      .get(`/contagens/v1/`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Array);
        done();
      });
  });
});
