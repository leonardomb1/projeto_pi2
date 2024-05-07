import express from "express"
import routes from "./routes/routes.js"

const app = express()
const PORT = 8080
app.use(routes)

app.listen(PORT, () =>{
    console.log(`Escutando na Porta ${PORT}`)
})

