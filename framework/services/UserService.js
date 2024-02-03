// get user info, delete user
import config from "../config";
// import userData from "../fixtures/userFixture.js";

export const getUserInfo = async (userID) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User/${userID}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  return response;
};

export const deleteUser = async (userID) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User/${userID}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });

  return response;
};
