import "dotenv/config";

export const config = {
  baseURL: process.env.TEST_BASE_API_URL,
  userId: process.env.TEST_USER_ID,
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
};
