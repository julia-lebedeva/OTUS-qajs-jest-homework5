// GENERATE CREDENTIALS FOR A NEW USER
import { faker } from "@faker-js/faker";
// const { faker } = require("@faker-js/faker");

export function generateUserCredentials() {
  return {
    login: faker.word.sample(),
    password: faker.internet.password({
      lengh: 8,
      memorable: false,
      pattern: /^[A-Z]*$/,
      prefix: "a0$",
    }),
  };
}
