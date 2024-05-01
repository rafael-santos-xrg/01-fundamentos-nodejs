import http from "node:http";

class User {
  constructor(name, email, password) {
    Object.assign(this, { name, email, password, id: (Math.random() * 10000).toFixed(0) });
  }
}

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  const getUsers = () => {
    return response.setHeader("Content-Type", "application/json").end(JSON.stringify(users));
  };

  const createUser = () => {
    const newUser = new User("Victor", "victor@.com", "1234");
    users.push(newUser);

    return response.writeHead(201).end();
  };

  const methodsAllowed = {
    GET: getUsers,
    POST: createUser,
  };

  if (url === "/users") {
    methodsAllowed[method]();
    return;
  }

  return response.writeHead(404).end();
});

server.listen(3333);
