# Catálogo de Produtos Importados

Este é um projeto completo com API REST, interface front-end e GraphQL.

## Estrutura

```
/meu-projeto/
├── /rest/        -> API REST com Express
├── /frontend/    -> Interface HTML + JS
├── /graphql/     -> API GraphQL com express-graphql
└── README.md
```

---

## Como Executar

### 1. Instalar Dependências
Navegue até a pasta do projeto (`/rest` ou `/graphql`) e instale as dependências:

```bash
npm install express cors
# Para GraphQL:
npm install express-graphql graphql
```

### 2. Iniciar a API REST

```bash
cd rest
node index.js
```

Servidor disponível em: `http://localhost:3000`

### 3. Iniciar a API GraphQL 

```bash
cd graphql
node server.js
```

GraphQL Playground disponível em: `http://localhost:4000/graphql`

---

## Executar o Front-End

Abra o arquivo `frontend/index.html` no navegador. A interface permite:

- Visualizar produtos
- Buscar produtos
- Adicionar produtos
- Remover produtos

Ela consome a API REST via `fetch`.

---

## Testar a API REST

- `GET /produtos` → Lista todos os produtos
- `GET /produtos/:id` → Retorna um produto por ID
- `POST /produtos` → Adiciona um produto
- `DELETE /produtos/:id` → Remove um produto

---

## Testar a API GraphQL

Exemplos de **queries** e **mutations** no Playground(basta copiar tudo e dar play no que quiser executar):

query VerProdutos {
  produtos {
    id
    nome
  }
}

query VerProdutoID{
  produto(id: 1) {
    nome
    preco
    descricao
  }
}

mutation CriarProduto {
  adicionarProduto(
    nome: "iPad",
    descricao: "Tablet Apple",
    preco: 3500,
    categoria: "Tablets"
  ) {
    id
    nome
  }
}

mutation DeletarProduto{
  deletarProduto(id: 1)
}
---

Desenvolvido para a AT1 - Projeto Back-End com integração front-end.