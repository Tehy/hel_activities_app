const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const mongoose = require("mongoose");

/* TODO
  /api/data/limit/:range 
  /api/data/tag/:tag
  /api/data/id/:id        <--- covered in user.test.js
  /api/data/items/:items  <--- covered in user.test.js
  */

describe("open data endpoint tests", () => {
  test("data is received from endpoint as json", async () => {
    await api.get("/api/data").expect("Content-Type", /application\/json/);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
