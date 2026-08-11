import express from 'express'
import produtos from './repository/produtos.js';
import produtos from './repository/produtos.js';

const app = express()

app.use(express.json())

app.get("/produtos", (req, res) => {
    const { marca, nome } = req.query
    if (marca || nome) {
        const produtosFiltrados = produtos.filter(item => item.marca.includes(marca) || item.nome.includes(nome))
        res.status(200).json(produtosFiltrados);
    } else {
        res.status(200).json(produtos);
    }
})

app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
})

app.get("/produtos/:id", (req, res) => {
    const produtos = produtos.find(p => p.id === Number(req.params.id));

    if (!produtos) {
        return res.status(404).json({ erro: "produto não encontrado"});
    }
    res.status(200).json(produtos);

    if (req?.body?.nome && req.body.nome != "") {
        produtos.nome = req.body.nome;
    }
    if (req?.body?.marca && req.body.marca != "") {
        produtos.marca = req.body.marca;
    }

})

app.post("/protudos", (req, res) => {

    const nome = req?.body?.nome || null
    const marca = req?.body?.marca || null

    if (!marca) {
        res.status(400).json({ erro: "marca e obrigatorio"})
    }

    if (!nome) {
        res.status(400).json({ erro: "nome e obrigatorio"})
    }

    const novoProduto = { 
        id: produtos.length +1, 
        nome: req.body.nome, 
        marca: req.body.marca }

        produtos.push(novoProduto);
        res.status(201).json(novoProduto);
})

app.get("/produto/:id/xml", (req, res) => {
    const produto = produtos.find(p => p.id === Number(req.params.id));
    if (!produto) {
        return res.status(404).type("application/xml").send("<erro>Produto nao encontrado</erro>");
    }
    res.status(200).type("application/xml").send('<id>${produto.id}</id><nome>${produto.nome}</nome>')
})


app.listen(3000,() => {
    console.log("bah ta funcionando 3000")
});