// GENERATE RANDON INDEX

export const randomIndex = (length) => {
  let index1 = Math.floor(Math.random() * (length - 1));
  let index2 = Math.floor(Math.random() * (length - 1));
  while (index1 === index2) {
    index2 = Math.floor(Math.random() * (length - 1));
  }
  return { index1, index2 };
};
