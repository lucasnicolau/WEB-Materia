const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

const PORT = 3000;
const DATA_FILE = './produtos.json';

app.use(cors());
app.use(express.json());

function loadProdutos() {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

function saveProdutos(produtos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(produtos, null, 2));
}

app.get('/produtos', (req, res) => {
    const produtos = loadProdutos();
    res.json(produtos);
});

app.get('/produtos/:id', (req, res) => {
    const produtos = loadProdutos();
    const produto = produtos.find(p => p.id == req.params.id);
    if (produto) res.json(produto);
    else res.status(404).json({ erro: 'Produto não encontrado' });
});

app.post('/produtos', (req, res) => {
    const produtos = loadProdutos();
    
    // Obter todos os IDs existentes
    const idsExistentes = produtos.map(p => p.id);

    // Encontrar o menor ID livre (começando do 1)
    let novoId = 1;
    while (idsExistentes.includes(novoId)) {
  novoId++;
}

const novoProduto = {
  id: novoId,
  ...req.body
};
    produtos.push(novoProduto);
    saveProdutos(produtos);
    res.status(201).json(novoProduto);
});

app.delete('/produtos/:id', (req, res) => {
    let produtos = loadProdutos();
    const novoArray = produtos.filter(p => p.id != req.params.id);
    if (novoArray.length === produtos.length)
        return res.status(404).json({ erro: 'Produto não encontrado' });

    saveProdutos(novoArray);
    res.json({ mensagem: 'Produto removido com sucesso' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});