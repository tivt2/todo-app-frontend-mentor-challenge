import express from "express";
import { getUser, insertUser } from "./queries";
import { v4 as uuid } from "uuid";
import { hashPassword } from "../utils/hashing";
import cors from "cors";
import { TtodoItem } from "../types/types";

const app = express();
app.use(cors());
const port = "3333";

app.get("/", (req, res) => {
  res.send("Hi");
});

const genUser = async (username: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  const userId = uuid();
  const todosOrder = Array(6)
    .fill(null)
    .map((_) => uuid());
  const initTodos = {} as { [id: string]: TtodoItem };
  const todos = todosOrder.reduce((acc, id) => {
    acc[id] = {
      id,
      content: id,
      complete: Math.random() > 0.5 ? true : false,
    };
    return acc;
  }, initTodos);
  return {
    id: userId,
    username,
    password: hashedPassword,
    todos,
    todosOrder,
  };
};

app.get("/insertUsers", async (req, res) => {
  const mockUsers = [
    await genUser("admin", "admin"),
    await genUser("admin2", "admin2"),
  ];

  const users = await insertUser(mockUsers);

  res.send(users);
});

app.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  const user = await getUser(username);
  res.json(user);
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
