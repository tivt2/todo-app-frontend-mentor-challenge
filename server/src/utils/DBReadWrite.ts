import fs from "fs";
import { Tdb } from "../types/types";

const readDB = async (): Promise<Tdb> => {
  const path = "./db.json";
  try {
    const db = await fs.promises.readFile(path, "utf-8");
    console.log("Read DB successfully");
    return JSON.parse(db);
  } catch (err) {
    console.error("Error trying to read DB");
    throw err;
  }
};

const writeDB = async (newDB: Tdb): Promise<void> => {
  const path = "./db.json";
  const data = JSON.stringify(newDB);
  try {
    await fs.promises.writeFile(path, data, "utf-8");
    console.log("Written to DB successfully");
  } catch (err) {
    console.error("Error trying to write DB");
    throw err;
  }
};

export { readDB, writeDB };
