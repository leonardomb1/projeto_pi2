import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "./main.db",
    driver: require("sqlite3").verbose(),
  });
}
