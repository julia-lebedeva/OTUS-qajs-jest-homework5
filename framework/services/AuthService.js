// GERERATE JWT, CHECK AUTHORISATION
import { config } from "../config/config.js";

export const authoriseUser = async ({ login, password }) => {
  const response = await fetch(`${config.baseURL}/Account/v1/Authorized`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: login,
      password: password,
    }),
  });

  return {
    headers: response.headers,
    status: response.status,
    body: await response.json(),
  };
};

export const generateToken = async ({ login, password }) => {
  const response = await fetch(`${config.baseURL}/Account/v1/GenerateToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: login,
      password: password,
    }),
  });
  return {
    headers: response.headers,
    status: response.status,
    body: await response.json(),
  };
};
