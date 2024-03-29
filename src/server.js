import express from "express";
import bodyParser from "body-parser";
import { sqlite } from "sqlite3";
const app = express();
const sqlite = sqlite.verbose();
let sql;
const db = new sqlite.Database("./main.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
});

app.use(bodyParser.json());
const port = 8080 | 8080;

app.get("/", (req, res) => {
  try {
    sql = "SELECT * FROM logs";
    db.all(sql, [], (err, rows) => {
      if (err) return res.status(300).json();
      return res.json(rows);
    });
  } catch (error) {
    return res.status(400).send();
  }
});

app.listen(port, () => console.log(`Server initiated on port: ${port}`));
