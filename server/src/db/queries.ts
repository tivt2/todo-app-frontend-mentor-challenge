import db from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { Tuser } from "../types/types";

export async function selectUserByUsername(username: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  return user[0];
}

export async function selectUserById(userId: string) {
  const user = await db.select().from(users).where(eq(users.id, userId));

  return user[0];
}

export async function insertNewUser(newUser: Tuser) {
  const user = await db.insert(users).values(newUser).returning();

  return user[0];
}

export async function updateUser(newTodoUser: Tuser) {
  const user = await db
    .update(users)
    .set(newTodoUser)
    .where(eq(users.id, newTodoUser.id))
    .returning();

  return user[0];
}
