// MANAGE USER: GET INFORMATION AND DELETE
import { config } from "../config/config.js";

export const createUser = async ({ login, password }) => {
  const response = await fetch("https://bookstore.demoqa.com/Account/v1/User", {
    method: "post",
    body: JSON.stringify({
      userName: login,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return {
    headers: response.headers,
    status: response.status,
    body: await response.json(),
  };
};

export const getUserInfo = async (userId, token) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User/${userId}`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  });
  return {
    headers: response.headers,
    status: response.status,
    body: await response.json(),
  };
};
export const deleteUser = async ({ userId, token }) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User/${userId}`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });
  return {
    headers: response.headers,
    status: response.status,
    body: await response.json(),
  };
};
