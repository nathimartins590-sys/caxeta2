import express from 'express'

const app = express()

app.use(express.json())

const produtos = [
    {
        id: 1,
        nome: "sabão em pó",
        marca: "homo"
    },
    {
        id: 2,
        nome: "Nescau",
        marca: "Nestle"
    },
    {
        id: 3,
        nome: "sprit",
        marca: "coca-cola"
    }
]

app.listen(3000,() => {
    console.log("bah ta funcionando 3000")
});