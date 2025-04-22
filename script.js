// Dados dos lanches disponíveis
const lanches = [
  { id: 1, nome: 'Hamburguer', ingredientes: ['Pão', 'Carne', 'Queijo', 'Alface', 'Tomate'], preco: 15.00 },
  { id: 2, nome: 'X-Burguer', ingredientes: ['Pão', 'Carne', 'Queijo', 'Bacon', 'Alface', 'Tomate'], preco: 20.00 },
  { id: 3, nome: 'X-Salada', ingredientes: ['Pão', 'Carne', 'Queijo', 'Alface', 'Tomate', 'Cebola'], preco: 20.00 },
  { id: 4, nome: 'X-Bacon', ingredientes: ['Pão', 'Carne', 'Queijo', 'Bacon', 'Alface', 'Tomate'], preco: 25.00 },
  { id: 5, nome: 'X-Egg', ingredientes: ['Pão', 'Carne', 'Queijo', 'Bacon', 'Alface', 'Tomate', 'Ovo'], preco: 30.00 },
  { id: 6, nome: 'X-Tudo', ingredientes: ['Pão', 'Carne', 'Queijo', 'Bacon', 'Alface', 'Tomate', 'Ovo', 'Cebola'], preco: 35.00 }
];


function renderizarLanches() {
  const container = document.getElementById('lanchesContainer');
  const selectLanche = document.getElementById('lancheEscolhido');

  lanches.forEach(lanche => {
      
      const divLanche = document.createElement('div');
      divLanche.classList.add('lanche');
      divLanche.innerHTML = `
          <h3>${lanche.nome}</h3>
          <p><strong>Preço:</strong> R$ ${lanche.preco.toFixed(2)}</p>
          <button onclick="verDetalhes(${lanche.id})">Ver Detalhes</button>
      `;
      container.appendChild(divLanche);

     
      const option = document.createElement('option');
      option.value = lanche.id;
      option.textContent = lanche.nome;
      selectLanche.appendChild(option);
  });
}


function verDetalhes(lancheId) {
  const lanche = lanches.find(l => l.id === lancheId);
  document.getElementById('lancheNome').textContent = lanche.nome;
  document.getElementById('lanchePreco').textContent = lanche.preco.toFixed(2);

  const ingredientesList = lanche.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('');
  document.getElementById('lancheDetalhes').innerHTML = `<strong>Ingredientes:</strong><ul>${ingredientesList}</ul>`;

  document.getElementById('modalDetalhes').style.display = 'block';
}


document.getElementById('fecharModal').addEventListener('click', function() {
  document.getElementById('modalDetalhes').style.display = 'none';
});

document.getElementById('formularioPedido').addEventListener('submit', function(event) {
  event.preventDefault();

  const nomeCliente = document.getElementById('nomeCliente').value;
  const cpfCliente = document.getElementById('cpfCliente').value;
  const dataPedido = document.getElementById('dataPedido').value;
  const lancheEscolhido = document.getElementById('lancheEscolhido').value;

  if (cpfCliente.length !== 11 || isNaN(cpfCliente)) {
      alert('CPF inválido. Certifique-se de inserir apenas números com 11 dígitos.');
      return;
  }

  const pedido = {
      nomeCliente,
      cpfCliente,
      dataPedido,
      lancheEscolhido: lanches.find(l => l.id == lancheEscolhido).nome,
  };

  
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  alert('Pedido confirmado com sucesso!');
});


document.addEventListener('DOMContentLoaded', renderizarLanches);
