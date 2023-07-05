import { InferModel } from "drizzle-orm";
import { json, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { TtodoItem } from "../types/types";

export const users = pgTable("user", {
  id: uuid("id").primaryKey(),
  username: varchar("username").notNull(),
  password: varchar("password").notNull(),
  todos: json("todos").notNull().$type<{ [todoId: string]: TtodoItem }>(),
  todosOrder: uuid("todosOrder").array().notNull(),
});

export type TUserDB = InferModel<typeof users>;
