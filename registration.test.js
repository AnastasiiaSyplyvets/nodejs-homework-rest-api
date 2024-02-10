const { registration } = require("./controllers/auth/registration");
require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST_TEST } = process.env;

/* 
1.ответ должен иметь статус-код 200
2.в ответе должен возвращаться токен
3.в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String */

describe("test registration function", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(DB_HOST_TEST);
      console.log("DB connected");
    } catch (error) {
      console.log(error);
    }
  });

  test("test", async () => {
    expect(1 + 1).toBe(2);
  });

  afterAll(async () => {
    await mongoose
      .disconnect(DB_HOST_TEST)
      .then(console.log("DB disconnected"));
  });
  //   test("res.status === 200", async () => {
  //     const req = {
  //       body: {
  //         name: "user",
  //         email: "user@gmail.com",
  //         password: "123456",
  //       },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //     const next = jest.fn();
  //     const result = await registration(res, res, next);
  //     expect(result.status).toBe(200);
  //   });
});
