// ADD A BOOK TO USER LIST
// UPDATE A BOOK IN USER LIST
// GET INFOR ABOUT A BOOK
// REMOVE A BOOK FROM USER LIST

import { config } from "../config/config.js";
import supertest from "supertest";

export const getAllBooks = async () => {
  const response = await supertest(config.baseURL).get("/BookStore/v1/Books");
  return {
    headers: response.headers,
    status: response.status,
    body: await response.body,
  };
};

export const getBook = async (isbn) => {
  const response = await supertest(config.baseURL).get(
    `/BookStore/v1/Book?ISBN=${isbn}`,
  );
  return {
    headers: response.headers,
    status: response.status,
    body: await response.body,
  };
};

export const addListOfBooks = async ({ userId, token, isbns }) => {
  const response = await supertest(config.baseURL)
    .post(`/BookStore/v1/Books`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      userId,
      collectionOfIsbns: isbns.map(isbn => ({ isbn })),
    });
  return {
    headers: response.headers,
    status: response.status,
    body: await response.body,
  };
};
export const replaceBook = async ({ userId, token, fromIsbn, toIsbn }) => {
  const response = await supertest(config.baseURL)
    .put(`/BookStore/v1/Books/${fromIsbn}`)
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json")
    .send({
      userId,
      isbn: toIsbn,
    });
  return {
    headers: response.headers,
    status: response.status,
    body: await response.body,
  };
};
export const removeBook = async ({ userId, token, isbn }) => {
  const response = await supertest(config.baseURL)
    .delete(`/BookStore/v1/Book`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      isbn: isbn,
      userId: userId,
    });
  return {
    headers: response.headers,
    status: response.status,
    body: await response.body,
  };
};

export const removeAllBooks = async ({ userId, token }) => {
  const response = await supertest(config.baseURL)
    .delete(`/BookStore/v1/Books?UserId=${userId}`)
    .set("Authorization", `Bearer ${token}`);
  return {
    headers: response.headers,
    status: response.status,
    body: await response.body,
  };
};
