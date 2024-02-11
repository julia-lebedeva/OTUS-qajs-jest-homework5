// GET USER INFO
import { config } from "../config/config.js";
import supertest from "supertest";

export const getUserInfo = async ({ userId, token }) => {
  const response = await supertest(config.baseURL)
    .get(`/Account/v1/User/${userId}`)
    .set("Authorization", `Bearer ${token}`);
  return {
    headers: response.headers,
    status: response.status,
    body: response.body,
  };
};
