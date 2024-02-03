import { faker } from "@faker-js/faker";
// const { faker } = require("@faker-js/faker");

// создать тестовых юзеров и вернуть их данные

const createUserData = () => {
  return {
    login: faker.word.sample(),
    password: faker.internet.password({
      lengh: 8,
      memorable: false,
      pattern: /^[A-Z]*$/,
      prefix: "a0$",
    }),
  };
};

// create user with userData

export const userData = createUser();
// вернуть userName, password, userID
