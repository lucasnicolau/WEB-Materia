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
    `;
    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.onclick = async () => {
      await fetch(`${API}/${p.id}`, { method: 'DELETE' });
      carregarProdutos();
    };
    card.appendChild(btn);
    lista.appendChild(card);
  });
}

document.getElementById('form-produto').onsubmit = async e => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const categoria = document.getElementById('categoria').value;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, descricao, preco, categoria })
  });

  e.target.reset();
  carregarProdutos();
};

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

carregarProdutos();