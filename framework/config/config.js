import "dotenv/config";

export const config = {
  baseURL: process.env.TEST_BASE_API_URL ?? "https://bookstore.demoqa.com",
};

// export default Object.freeze(config)
