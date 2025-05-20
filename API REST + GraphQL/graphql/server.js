const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const cors = require('cors');

const DATA_FILE = './produtos.json';

function loadProdutos() {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

function saveProdutos(produtos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(produtos, null, 2));
}

const schema = buildSchema(`
  type Produto {
    id: ID!
    nome: String!
    descricao: String!
    preco: Float!
    categoria: String!
  }

  type Query {
    produtos: [Produto]
    produto(id: ID!): Produto
  }

  type Mutation {
    adicionarProduto(nome: String!, descricao: String!, preco: Float!, categoria: String!): Produto
    deletarProduto(id: ID!): String
  }
`);

const root = {
  produtos: () => loadProdutos(),
  produto: ({ id }) => loadProdutos().find(p => p.id == id),
  adicionarProduto: ({ nome, descricao, preco, categoria }) => {
    const produtos = loadProdutos();
    const idsExistentes = produtos.map(p => parseInt(p.id));
    let novoId = 1;
    while (idsExistentes.includes(novoId)) {
      novoId++;
    }
    const novo = {
      id: novoId.toString(),
      nome,
      descricao,
      preco,
      categoria
    };
    produtos.push(novo);
    saveProdutos(produtos);
    return novo;
  },
  deletarProduto: ({ id }) => {
    let produtos = loadProdutos();
    const novaLista = produtos.filter(p => p.id != id);
    if (novaLista.length === produtos.length) return 'Produto não encontrado';
    saveProdutos(novaLista);
    return 'Produto deletado com sucesso';
  }
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Servidor GraphQL em http://localhost:4000/graphql');
});