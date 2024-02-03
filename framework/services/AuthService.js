// authorise user, generate token
import config from "../config";
// import userData from "../fixtures/userFixture.js";

export const authoriseUser = async (login, password) => {
  const response = await fetch(`${config.baseURL}/Account/v1/Authorized`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: login,
      password: password,
    }),
  });

  return {
    // headers: response.headers,
    // status: response.status,
    // data: await response.json(),
    response,
  };
};

export const generateToken = async (login, password) => {
  const response = await fetch(`${config.baseURL}/Account/v1/GenerateToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: login,
      password: password,
    }),
  });
  return response;
};
