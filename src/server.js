import express from "express"

const app = express()

const port = 8080

app.get('/',(req,res) => {
    res.status(200).send('Olá mundo!')
})

app.get('/usuarios',(req,res)=>{
    res.json({nome: 'Teste', idade: 30})
})

app.listen(port, () => {
    console.log(`Server running on ${port}`); 
})