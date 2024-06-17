import express from "express";
import routes from "./routes/routes.js";
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
