import express, { Express, Request, Response } from "express";
import cors from "cors";
import { readDB } from "./utils/DBReadWrite";
import { Tdb } from "./types/types";
import { buildUser } from "./utils/buildUser";
import { genToken } from "./utils/genToken";
import { authToken } from "./middleware/authToken";
import { deleteTodoItem, editTodoItem, newTodoItem } from "./utils/utils";
import { v4 as uuidv4 } from "uuid";
import { comparePassword, hashPassword } from "./utils/hashing";
import { spamProtect } from "./middleware/spamProtect";

const app: Express = express();

let DB: Tdb;

readDB()
  .then(async (data) => {
    const hashedPassword = await hashPassword("admin2");
    const newUser = buildUser("admin2", hashedPassword);
    for (let i = 0; i < 5; i++) {
      const newTodoId = uuidv4();
      newUser.todos[newTodoId] = {
        id: newTodoId,
        content: newTodoId,
        complete: false,
      };
      newUser.todosOrder.push(newTodoId);
    }
    data[newUser.id] = newUser;
    DB = data;
  })
  .catch(() => (DB = {}));

app.use(express.json());
app.use(cors());
app.use(spamProtect);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.post("/api/register", async (req: Request, res: Response) => {
  console.log("new register request");
  const { username, password } = req.body;

  const userExist = Object.keys(DB).some(
    (userId) => DB[userId].username === username
  );

  if (userExist) {
    console.log("user creation failed username already exist");
    return res.status(400).json({ message: "User name already exist" });
  }

  console.log("building new user");
  const hashedPassword = await hashPassword(password);
  const newUser = buildUser(username, hashedPassword);
  DB[newUser.id] = newUser;
  res.status(201).json({ message: `Registred user ${username}` });
});

app.post("/api/login", async (req: Request, res: Response) => {
  console.log("new login request");
  const { username, password } = req.body;

  const userId = Object.keys(DB).find(
    (userId) => DB[userId].username === username
  );
  if (!userId) {
    console.log("user doesnt exist");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await comparePassword(password, DB[userId].password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = genToken(userId);
  res.status(202).json({ token });
});

app.get("/api/todos", authToken, (req: Request, res: Response) => {
  console.log("new get user request");
  const { userId } = req.body;

  const user = DB[userId];
  const payload = {
    id: user.id,
    username: user.username,
    todos: user.todos,
    todosOrder: user.todosOrder,
  };
  res.status(200).json(payload);
});

app.post("/api/todos", authToken, (req: Request, res: Response) => {
  console.log("new create todo request");
  const {
    userId,
    data: { content, complete },
  } = req.body;

  const user = DB[userId];
  newTodoItem(DB, user, content, complete);
  console.log("created new todo");
  const payload = {
    id: user.id,
    username: user.username,
    todos: user.todos,
    todosOrder: user.todosOrder,
  };
  res.status(200).json(payload);
});

app.put("/api/todos", authToken, (req: Request, res: Response) => {
  console.log("new edit todo request");
  const {
    userId,
    data: { id: todoId, content, complete },
  } = req.body;

  const user = DB[userId];
  editTodoItem(DB, user, todoId, content, complete);
  console.log("edited todo item");
  const payload = {
    id: user.id,
    username: user.username,
    todos: user.todos,
    todosOrder: user.todosOrder,
  };
  res.status(200).json(payload);
});

app.put("/api/todos/order", authToken, (req: Request, res: Response) => {
  console.log("new edittodosOrder request");
  const {
    userId,
    data: { newTodosOrder },
  } = req.body;

  const user = DB[userId];
  user.todosOrder = newTodosOrder;
  console.log("edited todosOrder");
  const payload = {
    id: user.id,
    username: user.username,
    todos: user.todos,
    todosOrder: user.todosOrder,
  };
  res.status(200).json(payload);
});

app.delete("/api/todos", authToken, (req: Request, res: Response) => {
  console.log("new delete todos request");
  const { userId, todoIds } = req.body;

  const user = DB[userId];
  deleteTodoItem(DB, user, todoIds);
  console.log("deleted todo item");
  const payload = {
    id: user.id,
    username: user.username,
    todos: user.todos,
    todosOrder: user.todosOrder,
  };
  res.status(200).json(payload);
});

export default app;
