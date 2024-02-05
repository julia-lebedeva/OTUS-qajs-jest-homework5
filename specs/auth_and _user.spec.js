import { generateUserCredentials } from "../framework/fixtures/userFixture.js";
import { authoriseUser, generateToken } from "../framework/services/AuthService.js";
import { createUser, getUserInfo, deleteUser } from "../framework/services/UserService.js";

describe("Тесты АПИ авторизации, получения информнации о пользователе и удаления пользователя", () => {
  let userCredentials;
  let token;
  let userId;
  beforeAll(async () => {
    userCredentials = generateUserCredentials();
    const response = await createUser(userCredentials);
    userId = response.body.userID;
  });
  test("Newly created user is unauthorised", async () => {
    const response = await authoriseUser(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toBe(false);
  });
  test("Generate token", async () => {
    const response = await generateToken(userCredentials);
    token = response.body.token;
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Success");
    expect(response.body.result).toBe("User authorized successfully.");
  });
  test("User is authorised after jwt generation", async () => {
    const response = await authoriseUser(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toBe(true);
  });
  test("Get information on existing user", async () => {
    const response = await getUserInfo(userId, token);
    expect(response.status).toBe(200);
    expect(response.body.userId).toBe(userId);
    expect(response.body.username).toBe(userCredentials.login);
  });
  test("Delete user", async () => {
    const response = await deleteUser(userId, token);
    expect(response.status).toBe(200);
  });
});
