import { generateToken } from "../framework/services/AuthService.js";
import { getUserInfo } from "../framework/services/UserService.js";
import { getAllBooks, getBook, addListOfBooks, replaceBook, removeBook, removeAllBooks } from "../framework/services/BookService.js";
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
  afterAll(async () => {
    removeAllBooks({ userId: userId, token: token });
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
  test("user's collection is empty", async () => {
    const response = await getUserInfo({ userId, token });
    const data = await response.body;
    expect(data.books).toEqual([]);
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
    expect(userData.username).toEqual(config.username);
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
  test("replace book in user's collection", async () => {
    const response = await replaceBook({
      userId,
      token,
      isbnFrom: book1.isbn,
      isbnTo: book2.isbn,
    });
    const data = await response.body;
    console.log(data);
    const responseUser = await getUserInfo({ userId, token });
    const userData = await responseUser.body;
    expect(response.status).toBe(200);
  });
});
