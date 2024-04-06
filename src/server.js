import express from "express"
import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();
const app = express();
let sql;
const db = new sqlite.Database("./main.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
})

app.use(express.json());

app.post('/quote', (req, res) => {
  try {
    const { NM_TESTE } = req.body;
    sql = "INSERT INTO TESTE(NM_teste) VALUES(?);"
    db.run(sql, [NM_TESTE], (err) => {
      if(err) return res.json({ status: 300, sucess: false, error: err });

      console.log("Sucesso", NM_TESTE);
    })
    return res.json({
      status: 200,
      success: true,
    });
  } catch (error) {
    return res.json ({
      status: 400,
      success: false,
    });
  }
})
app.listen(3000);
