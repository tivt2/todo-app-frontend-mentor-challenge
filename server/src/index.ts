import express, { Express, Request, Response } from "express";
import cors from "cors";
import { buildUser } from "./utils/buildUser";
import { genToken } from "./utils/genToken";
import { authToken } from "./middleware/authToken";
import { deleteTodoItem, editTodoItem, newTodoUser } from "./utils/utils";
import { comparePassword, hashPassword } from "./utils/hashing";
import { spamProtect } from "./middleware/spamProtect";
import {
  selectUserById,
  selectUserByUsername,
  insertNewUser,
  updateUser,
} from "./db/queries";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(spamProtect);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// REGISTER ROUTE
app.post("/api/register", async (req: Request, res: Response) => {
  console.log("new register request");
  const { username, password } = req.body;

  const user = await selectUserByUsername(username);

  if (user) {
    console.log("user creation failed username already exist");
    return res.status(400).json({ message: "User name already exist" });
  }

  console.log("building new user");
  const hashedPassword = await hashPassword(password);
  const newUser = buildUser(username, hashedPassword);
  const registredUser = await insertNewUser(newUser);
  console.log(registredUser);
  res.status(201).json({ message: `Registred user ${username}` });
});

// LOGIN ROUTE
app.post("/api/login", async (req: Request, res: Response) => {
  console.log("new login request");
  const { username, password } = req.body;

  const user = await selectUserByUsername(username);

  if (!user) {
    console.log("user doesnt exist");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = genToken(user.id);
  res.status(202).json({ token });
});

// GET USER ROUTE
app.get("/api/todos", authToken, async (req: Request, res: Response) => {
  console.log("new get user request");
  const { userId } = req.body;

  const user = await selectUserById(userId);
  if (!user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const payload = {
    id: user.id,
    username: user.username,
    todos: user.todos,
    todosOrder: user.todosOrder,
  };
  res.status(200).json(payload);
});

// CREATE NEW TODO ROUTE
app.post("/api/todos", authToken, async (req: Request, res: Response) => {
  console.log("new create todo request");
  const {
    userId,
    data: { content, complete },
  } = req.body;

  const user = await selectUserById(userId);
  if (!user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const updatedUser = newTodoUser(user, content, complete);
  const newUser = await updateUser(updatedUser);
  console.log("created new todo");
  const payload = {
    id: newUser.id,
    username: newUser.username,
    todos: newUser.todos,
    todosOrder: newUser.todosOrder,
  };
  res.status(200).json(payload);
});

// EDIT TODO ROUTE
app.put("/api/todos", authToken, async (req: Request, res: Response) => {
  console.log("new edit todo request");
  const {
    userId,
    data: { id: todoId, content, complete },
  } = req.body;

  const user = await selectUserById(userId);
  if (!user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const updatedUser = editTodoItem(user, todoId, content, complete);
  const newUser = await updateUser(updatedUser);
  console.log("edited todo item");
  const payload = {
    id: newUser.id,
    username: newUser.username,
    todos: newUser.todos,
    todosOrder: newUser.todosOrder,
  };
  res.status(200).json(payload);
});

// EDIT TODOS ORDER ROUTE
app.put("/api/todos/order", authToken, async (req: Request, res: Response) => {
  console.log("new edittodosOrder request");
  const {
    userId,
    data: { newTodosOrder },
  } = req.body;

  const user = await selectUserById(userId);
  if (!user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  user.todosOrder = newTodosOrder;
  const newUser = await updateUser(user);
  console.log("edited todosOrder");
  const payload = {
    id: newUser.id,
    username: newUser.username,
    todos: newUser.todos,
    todosOrder: newUser.todosOrder,
  };
  res.status(200).json(payload);
});

// DELETE TODOS ROUTE
app.delete("/api/todos", authToken, async (req: Request, res: Response) => {
  console.log("new delete todos request");
  const { userId, todoIds } = req.body;

  const user = await selectUserById(userId);
  if (!user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const updatedUser = deleteTodoItem(user, todoIds);
  const newUser = await updateUser(updatedUser);
  console.log("deleted todo item");
  const payload = {
    id: newUser.id,
    username: newUser.username,
    todos: newUser.todos,
    todosOrder: newUser.todosOrder,
  };
  res.status(200).json(payload);
});

export default app;
