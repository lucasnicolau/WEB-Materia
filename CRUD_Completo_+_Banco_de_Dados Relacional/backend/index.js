const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./produtos.db');

// Cria a tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco REAL,
  categoria TEXT
)`);

// GET /produtos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// GET /produtos/:id
app.get('/produtos/:id', (req, res) => {
  db.get('SELECT * FROM produtos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(row);
  });
});

// POST /produtos
app.post('/produtos', (req, res) => {
  const { nome, descricao, preco, categoria } = req.body;
  const sql = 'INSERT INTO produtos (nome, descricao, preco, categoria) VALUES (?, ?, ?, ?)';
  db.run(sql, [nome, descricao, preco, categoria], function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: this.lastID, nome, descricao, preco, categoria });
  });
});

// PUT /produtos/:id
app.put('/produtos/:id', (req, res) => {
  const { nome, descricao, preco, categoria } = req.body;
  const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria = ? WHERE id = ?';
  db.run(sql, [nome, descricao, preco, categoria, req.params.id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json({ id: parseInt(req.params.id), nome, descricao, preco, categoria });
  });
});

// DELETE /produtos/:id
app.delete('/produtos/:id', (req, res) => {
  db.run('DELETE FROM produtos WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json({ mensagem: 'Produto removido com sucesso' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});