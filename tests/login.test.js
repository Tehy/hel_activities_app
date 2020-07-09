const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

describe("login tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("password", 10);
    const initialUser = new User({
      username: "test",
      passwordHash: passwordHash,
    });
    await initialUser.save();
  });
  test("user can login", async () => {
    const result = await api
      .post("/api/login")
      .send({ username: "test", password: "password" })
      .expect(200);
  });
  test("user login fails with wrong password", async () => {
    const result = await api
      .post("/api/login")
      .send({ username: "test", password: "wrongpassword" })
      .expect(401);
  });
  test("user login fails with wrong username", async () => {
    const result = await api
      .post("/api/login")
      .send({ username: "wrongusername", password: "password" })
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
