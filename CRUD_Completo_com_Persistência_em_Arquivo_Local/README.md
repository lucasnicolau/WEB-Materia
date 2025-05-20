#  Catálogo de Produtos Importados - CRUD Completo

Este projeto implementa um CRUD completo (Create, Read, Update, Delete) para gerenciar produtos importados utilizando Node.js com Express e persistência em arquivo JSON.

---

##  Estrutura do Projeto

```
/meu-projeto-crud/
├── /backend/     → API REST (Node.js + Express)
│   ├── index.js  → Código do servidor
│   └── data.json → Base de dados local (JSON)
├── /frontend/    → Interface HTML + JS puro
│   ├── index.html
│   └── script.js
└── README.md     → Este arquivo
```

---

##  Como Executar o Projeto

### 1. Iniciar o Servidor Back-End

Abra o terminal e execute:

```bash
cd backend
npm install express cors
node index.js
```

O servidor será iniciado em:
```
http://localhost:3000
```

---

### 2. Abrir o Front-End

Abra o arquivo `frontend/index.html` no navegador.

---

##  Funcionalidades

- Listar todos os produtos
- Cadastrar novo produto
- Editar produto existente
- Deletar produto
- Buscar produto por ID

---

##  Rotas da API (REST)

- `GET /produtos` → Lista todos os produtos
- `GET /produtos/:id` → Retorna um produto por ID
- `POST /produtos` → Adiciona um produto
- `PUT /produtos/:id ` → Atualiza produto existente
- `DELETE /produtos/:id` → Remove um produto

---

##  Persistência

Todos os dados são armazenados localmente no arquivo:
```
backend/data.json
```

---
Desenvolvido para a AT2 - CRUD Completo com Persistência em Arquivo Local.