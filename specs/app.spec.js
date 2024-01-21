// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

// 1) ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ИМЕНИ
// - имя должно быть сторокой
// - имя не может быть короче 2 символов
// - имя не может содержать пробелов
// - имя должно состоять только из букв

describe("nameIsValid function", () => {
  describe("Positive cases: string at least 2 letters long", () => {
    const testData = [
      {
        name: "ab",
        expected: true,
      },
      {
        name: "abc",
        expected: true,
      },
    ];
    test.each(testData)("Case ($name)", ({ name, expected }) => {
      const result = nameIsValid(name);
      expect(result).toBe(expected);
    });
  });
  describe("Negative cases", () => {
    test("shorter string should be invalid", () => {
      const result = nameIsValid("X");
      expect(result).toBe(false);
    });
    test("empty string should be invalid", () => {
      const result = nameIsValid("");
      expect(result).toBe(false);
    });
    test("string with spaces should be invalid", () => {
      const result = nameIsValid("a b c");
      expect(result).toBe(false);
    });
    test("string with symbols other then letters should be invalid", () => {
      const result = nameIsValid("ac1");
      expect(result).toBe(false);
    });
    test("number should be invalid", () => {
      const result = nameIsValid(123);
      expect(result).toBe(false);
    });
  });
});

// 2) ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ ПРОБЕЛОВ
// - должна удалить все пробелы в начале, в конце и в середине строки
// - результом применения к пустой строке является пустая строка

describe("fullTrim function", () => {
  const testData = [
    {
      text: "   ABC",
      expected: 3,
    },
    {
      text: "ABC   ",
      expected: 3,
    },
    {
      text: "1 2 3",
      expected: 3,
    },
    {
      text: "   ",
      expected: 0,
    },
    {
      text: "",
      expected: 0,
    },
  ];

  test.each(testData)("should remove all spaces. Case ($text)", ({ text, expected }) => {
      const result = fullTrim(text);
      expect(result.length).toBe(expected);
    },
  );
});
// 3) ФУНКЦИЯ ДЛЯ ПОДСЧЕТА СУММЫ ЗАКАЗА

describe("getTotal function", () => {
  describe("positive cases", () => {
    test("case 1", () => {
      const result = getTotal([{ price: 50, quantity: 1 }], 0);
      expect(result).toBe(50);
    });
  });
});
