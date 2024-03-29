import express from "express";
const port = 8080 | 8080;
const app = express();
app.use(express.json());



app.get("/hello", (req, res) => {
  res.send("HELLO WORLD!");
});

app.listen(port, () => console.log(`Server initiated on port: ${port}`));
