const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./index.js");

const api = supertest(app);

test("data is returned as json", async () => {
  await api
    .get("/api/data")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
