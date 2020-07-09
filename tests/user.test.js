const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);

/* TODO
  fix routes logic/naming logic
  fix open data api dependance / confirm the data ids exist
*/
const initUsername = "test";
const initPassword = "password";
const initItemId = "42fb0bd4-778f-4849-a1e0-522a64311705";
describe("user tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash(initPassword, 10);
    const initialUser = new User({
      username: initUsername,
      savedItems: [initItemId],
      passwordHash: passwordHash,
    });
    await initialUser.save();
  });
  test("user can be created ", async () => {
    await api
      .post("/api/user")
      .send({ username: "newUser", password: "newPassword" })
      .expect(200);
  });

  test("user creation fails with existing username", async () => {
    const result = await api
      .post("/api/user")
      .send({ username: "test", password: "test" })
      .expect(401);

    expect(result.body.message).toContain("`username` to be unique");
  });

  test("user can save activity item", async () => {
    const result = await api
      .post("/db")
      .send({
        id: "855f4ef6-fd58-4197-9d0a-862e8d87bc5d",
        username: initUsername,
      })
      .expect(200);
  });

  test("user saved items count increases by one when user saves an activity item", async () => {
    await api.post("/db").send({
      id: "855f4ef6-fd58-4197-9d0a-862e8d87bc5d",
      username: initUsername,
    });

    const result = await api
      .post("/api/login")
      .send({ username: initUsername, password: initPassword });

    expect(result.status).toBe(200);
    expect(result.body.savedItems.length).toBe(2);
  });

  test("user can get saved activity item", async () => {
    const result = await api.get("/api/data/id/" + initItemId);
    expect(result.status).toBe(200);
    expect(JSON.parse(result.body).id).toBe(initItemId);
  });

  test("user can get all saved item ids data", async () => {
    const newItemId = "855f4ef6-fd58-4197-9d0a-862e8d87bc5d";
    await api.post("/db").send({
      id: newItemId,
      username: initUsername,
    });
    const items = await api
      .post("/api/login")
      .send({ username: initUsername, password: initPassword });

    const result = await api.get("/api/data/items/" + items.body.savedItems);
    expect(result.status).toBe(200);
    expect(JSON.parse(result.body).meta.count).toBe(2);
  });

  test("user can delete saved item, db decreases by one", async () => {
    let items = await api
      .post("/api/login")
      .send({ username: initUsername, password: initPassword });
    expect(items.body.savedItems.length).toBe(1);
    const result = await api
      .delete("/db")
      .send({ id: initItemId, username: initUsername });
    expect(result.body).toEqual(initItemId);
    items = await api
      .post("/api/login")
      .send({ username: initUsername, password: initPassword });
    expect(items.body.savedItems.length).toBe(0);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
