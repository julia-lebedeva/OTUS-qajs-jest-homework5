// GENERATE JWT
import { config } from "../config/config.js";
import supertest from "supertest";

export const generateToken = async ({ login, password }) => {
  const response = await supertest(config.baseURL)
    .post("/Account/v1/GenerateToken")
    .set("Content-Type", "application/json")
    .send({
      userName: login,
      password: password,
    });
  return {
    headers: response.headers,
    status: response.status,
    body: await response.body,
  };
};
