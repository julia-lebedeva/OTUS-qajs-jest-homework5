import { generateToken } from "../framework/services/AuthService.js";
import { getUserInfo } from "../framework/services/UserService.js";
import {
  getAllBooks,
  getBook,
  addListOfBooks,
  replaceBook,
  removeBook,
  removeAllBooks,
} from "../framework/services/BookService.js";
import books from "../framework/fixtures/booksFixture.json";
import { randomIndex } from "../framework/fixtures/isbnFixture.js";
import { config } from "../framework/config/config.js";

describe("book tests", () => {
  let token;
  let book1;
  let book2;
  let userId;
  beforeAll(async () => {
    const response = await generateToken({
      login: config.username,
      password: config.password,
    });
    token = response.body.token;
    userId = config.userId;
    const index = randomIndex(8);
    book1 = books.books[index.index1];
    book2 = books.books[index.index2];
  });

  test("get all books", async () => {
    const response = await getAllBooks();
    const data = await response.body;
    expect(response.status).toBe(200);
    expect(data).toEqual(books);
  });
  test("get a book", async () => {
    const response = await getBook(book1.isbn);
    expect(response.status).toBe(200);
  });
  test("remove all books from user's collection", async () => {
    const response = await removeAllBooks({ userId, token });
    expect(response.status).toBe(204);
    const responseUser = await getUserInfo({ userId, token });
    const userData = await responseUser.body;
    expect(userData.books).toEqual([]);
  });
  test("add book to empty user's collection", async () => {
    const response = await addListOfBooks({
      userId,
      token,
      isbns: [book1.isbn],
    });
    const responseUser = await getUserInfo({ userId, token });
    const userData = await responseUser.body;
    expect(response.status).toBe(201);
    expect(userData.books).toEqual([book1]);
  });
  test("add book which is already user's collection", async () => {
    const response = await addListOfBooks({
      userId,
      token,
      isbns: [book1.isbn],
    });
    const data = await response.body;
    expect(response.status).toBe(400);
    expect(data.code).toBe("1210");
    expect(data.message).toBe("ISBN already present in the User's Collection!");
  });
  test("add another book to user's collection", async () => {
    const response = await addListOfBooks({
      userId,
      token,
      isbns: [book2.isbn],
    });
    const responseUser = await getUserInfo({ userId, token });
    const userData = await responseUser.body;
    expect(response.status).toBe(201);
    expect(userData.books).toEqual([book1, book2]);
  });
  test("remove book from user's collection", async () => {
    const responseRemove = await removeBook({
      userId,
      token,
      isbn: book2.isbn,
    });
    const responseUserAfter = await getUserInfo({ userId, token });
    const userDataAfter = await responseUserAfter.body;
    expect(responseRemove.status).toBe(204);
    expect(userDataAfter.books).toEqual([book1]);
  });
  test("replace book in user's collection", async () => {
    const response = await replaceBook({
      userId,
      token,
      fromIsbn: book1.isbn,
      toIsbn: book2.isbn,
    });
    const data = await response.body;
    expect(response.status).toBe(200);
    expect(data.username).toEqual(config.username);
  });
});
