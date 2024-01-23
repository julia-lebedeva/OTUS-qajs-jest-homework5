// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

// 1) ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ИМЕНИ
// - имя должно быть сторокой
// - имя не может быть короче 2 символов
// - имя не может содержать пробелов
// - имя должно состоять только из букв

describe("nameIsValid function", () => {
  describe("Positive cases: String at least 2 letters long", () => {
    const testData = [
      {
        text: "ab",
        expected: true,
      },
      {
        text: "abc",
        expected: true,
      },
    ];
    test.each(testData)("Case ($text)", ({ text, expected }) => {
      const result = nameIsValid(text);
      expect(result).toBe(expected);
    });
  });
  describe("Negative cases", () => {
    const testData = [
      {
        name: "Case 1: Shorter string should be invalid",
        text: "X",
        expected: false,
      },
      {
        name: "Case 2: Empty string should be invalid",
        text: "",
        expected: false,
      },
      {
        name: "Case 3: string with spaces should be invalid",
        text: "a b c",
        expected: false,
      },
      {
        name: "Case 4:String with symbols other then letters should be invalid",
        text: "ab1",
        expected: false,
      },
      {
        name: "Case 5: Number should be invalid",
        text: 123,
        expected: false,
      },
    ];
    test.each(testData)('%s', ({ text, expected }) => {
      const result = nameIsValid(text);
      expect(result).toBe(expected);
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
// - скидка должна быть числом
// - скидка не может быть отрицательной
// - скидка не может быть > 100
// - 

describe("getTotal function", () => {
  describe("Positive cases", () => {
  //  describe("Checking calculation of amount without zero discount", () => {
      const positiveTestData = [
        {
          name: 'Case 1: 100% discount should result in 0',
          items: [
            { price: 10, quantity: 10 },
          ],
          discount: 100,
          expected: 0,
        },
        {
          name: 'Case 2: One item in the basket, zero discount',
          items: [
            { price: 10, quantity: 10 },
          ],
          discount: 0,
          expected: 100,
        },
        {
          name: 'Case 3: More than one item in the basket, zero discount',
          items: [
            { price: 10, quantity: 0 },
            { price: 10, quantity: 9 },
          ],
          discount: 0,
          expected: 90,
        },
        {
          name: 'Case 4: Checking calculation of amount with discount which is an integer',
          items: [
            { price: 10, quantity: 10 },
          ],
          discount: 10,
          expected: 90,
        },
        {
          name: 'Case 5: Checking calculation of amount with discount which is a float',
          items: [
            { price: 10, quantity: 10 },
          ],
          discount: 9.5,
          expected: 90.5,
        },
      ]
      test.each(positiveTestData)('%s', ({ items, discount, expected }) => {
          const result = getTotal(items, discount);
          expect(result).toBe(expected);
       },
      )
 //   });
  });
  describe("Negative cases", () => {
    const negativeTestData = [
      {
        name: 'Case 1: Discount should not be negative',
        items: [
          { price: 50, quantity: 10 },
        ],
        discount: -1,
        expectedError: 'Процент скидки не может быть отрицательным',
      },
      {
        name: 'Case 2: Discount should be a number',
        items: [
          { price: 10, quantity: 10 },
        ],
        discount: "50",
        expectedError: 'Скидка должна быть числом',
      },
    ]
    test.each(negativeTestData)('%s', ({ items, discount, expectedError }) => {
      expect(() => {getTotal(items, discount)}).toThrow(expectedError);
   },
  )
  });
  test("Negative case 3: Discount should not exceed 100", () => {
    expect(() => {getTotal([{ price: 50, quantity: 1 }], 110)}).toThrow();
  })
});
