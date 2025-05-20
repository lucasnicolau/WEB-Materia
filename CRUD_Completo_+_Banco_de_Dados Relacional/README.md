# Catálogo de Produtos Importados - CRUD com Banco de Dados

Este projeto implementa um CRUD completo (Create, Read, Update, Delete) para gerenciar produtos importados utilizando Node.js com Express e banco de dados relacional SQLite.

---

## Estrutura do Projeto

```
/meu-projeto-crud-sqlite/
├── /backend/        → Servidor Express + SQLite
│   ├── index.js     → Código da API
│   ├── produtos.db  → Banco SQLite (gerado automaticamente)
│   └── schema.sql   → Script de criação da tabela
├── /frontend/       → Interface HTML + JS puro
│   ├── index.html
│   └── script.js
└── README.md        → Este arquivo
```

---

##  Como Executar o Projeto

### 1. Iniciar o Back-End

Abra o terminal e execute:

```bash
cd backend
npm install express cors sqlite3
node index.js
```

O servidor será iniciado em:
```
http://localhost:3000
```

O banco SQLite será salvo no arquivo `produtos.db`.

---

### 2. Iniciar o Front-End

Abra o arquivo `frontend/index.html` no navegador.

---

## Funcionalidades

- Listar todos os produtos
- Cadastrar novo produto
- Editar produto existente
- Deletar produto
- Buscar produto por ID

---

## Rotas REST da API

- `GET /produtos` → Lista todos os produtos
- `GET /produtos/:id` → Retorna um produto por ID
- `POST /produtos` → Adiciona um produto
- `PUT /produtos/:id ` → Atualiza produto existente
- `DELETE /produtos/:id` → Remove um produto

---

## Banco de Dados

Banco usado: **SQLite**
- Criação automática no arquivo `produtos.db`
- Script de criação da tabela:
```
CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco REAL,
 categoria TEXT
);
```
---

Desenvolvido para a AT3 - CRUD Completo com Banco de Dados Relacional.