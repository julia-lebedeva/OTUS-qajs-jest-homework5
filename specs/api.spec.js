const { faker } = require("@faker-js/faker");

const createTestData = () => {
  const testData = {
    login: faker.word.sample(),
    password: faker.internet.password({
      lengh: 8,
      memorable: false,
      pattern: /^[A-Z]*$/,
      prefix: "a0$",
    }),
    altLogin: faker.word.sample(),
    altPassword: faker.internet.password({
      lengh: 8,
      memorable: false,
      pattern: /^[A-Z]*$/,
      prefix: "b1$",
    }),
    badPassword: faker.word.sample(),
  };
  return testData;
};

async function createUser(login, password) {
  const response = await fetch("https://bookstore.demoqa.com/Account/v1/User", {
    method: "post",
    body: JSON.stringify({
      userName: login,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}
async function generateToken(login, password) {
  const response = await fetch(
    "https://bookstore.demoqa.com/Account/v1/GenerateToken",
    {
      method: "post",
      body: JSON.stringify({
        userName: login,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    },
  );
  return response;
}
describe("5 api tests bookstore service", () => {
  const testData = createTestData();
  test("1) Создание нового пользователя", async () => {
    const response = await createUser(testData.login, testData.password);
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.username).toBe(testData.login);
  });
  test("2) Создание пользователя c ошибкой - логин уже используется", async () => {
    const response = await createUser(testData.login, testData.password);
    const data = await response.json();
    expect(response.status).toBe(406);
    expect(data.code).toBe("1204");
    expect(data.message).toBe("User exists!");
  });
  test("3) Создание пользователя c ошибкой - пароль не проходит", async () => {
    const response = await createUser(testData.altLogin, testData.badPassword);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.code).toBe("1300");
    expect(data.message).toMatch(/Passwords must have at least/);
  });
  test("4) Генерация токена успешно", async () => {
    const response = await generateToken(testData.login, testData.password);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.status).toBe("Success");
    expect(data.result).toBe("User authorized successfully.");
  });
  test("5) Гененрация c ошибкой", async () => {
    const response = await generateToken(testData.login, testData.altPassword);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.status).toBe("Failed");
    expect(data.result).toBe("User authorization failed.");
  });
});
