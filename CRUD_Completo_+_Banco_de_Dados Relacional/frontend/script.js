const API = 'http://localhost:3000/produtos';

async function carregarProdutos() {
  const res = await fetch(API);
  const produtos = await res.json();
  const lista = document.getElementById('lista-produtos');
  lista.innerHTML = '';
  produtos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.innerHTML = `
      <p><strong>ID:</strong> ${p.id}</p>
      <p><strong>Nome:</strong> ${p.nome}</p>
      <p><strong>Descrição:</strong> ${p.descricao}</p>
      <p><strong>Preço:</strong> R$${p.preco}</p>
      <p><strong>Categoria:</strong> ${p.categoria}</p>
      <div class="actions">
        <button onclick='editarProduto(${JSON.stringify(p)})'>Editar</button>
        <button onclick='deletarProduto(${p.id})'>Remover</button>
      </div>
    `;
    lista.appendChild(card);
  });
}

document.getElementById('form-produto').onsubmit = async e => {
  e.preventDefault();
  const id = document.getElementById('id').value;
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const categoria = document.getElementById('categoria').value;

  const payload = { nome, descricao, preco, categoria };

  if (id) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  e.target.reset();
  carregarProdutos();
};

function editarProduto(produto) {
  document.getElementById('id').value = produto.id;
  document.getElementById('nome').value = produto.nome;
  document.getElementById('descricao').value = produto.descricao;
  document.getElementById('preco').value = produto.preco;
  document.getElementById('categoria').value = produto.categoria;
}

async function deletarProduto(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  carregarProdutos();
}

carregarProdutos();

document.getElementById('form-busca-id').onsubmit = async e => {
  e.preventDefault();
  const id = document.getElementById('id-busca').value;
  const resultadoDiv = document.getElementById('resultado-busca');

  try {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error('Produto não encontrado');
    const produto = await res.json();
    resultadoDiv.innerHTML = `
      <p><strong>ID:</strong> ${produto.id}</p>
      <p><strong>Nome:</strong> ${produto.nome}</p>
      <p><strong>Descrição:</strong> ${produto.descricao}</p>
      <p><strong>Preço:</strong> R$${produto.preco}</p>
      <p><strong>Categoria:</strong> ${produto.categoria}</p>
    `;
  } catch (err) {
    resultadoDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }

  e.target.reset();
};