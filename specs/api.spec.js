async function createUser (login, password) {
  const response = await fetch("https://bookstore.demoqa.com/Account/v1/User", {
    method: "post",
    body: JSON.stringify({
      userName: login,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}
