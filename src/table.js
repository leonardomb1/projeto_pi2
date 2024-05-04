import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

const db = new sqlite.Database('../src/main.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
})

const sql = `CREATE TABLE TESTE(ID_TESTE INTEGER PRIMARY KEY, NM_TESTE TEXT)`;
db.run(sql);
