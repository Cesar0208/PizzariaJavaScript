// Produto 1
const nomeProduto1 = "Café Expresso";
let precoProduto1 = 8.50;
const statusProduto1 = "Em Estoque";

// Produto 2
const nomeProduto2 = "Capuccino";
let precoProduto2 = 12.00; // Troque o preço para testar os condicionais
const statusProduto2 = "Em Estoque";

// Produto 3
const nomeProduto3 = "Pão de Queijo";
let precoProduto3 = 5.00;
const statusProduto3 = "Esgotado";

// Manipulação DOM - Produto 1
const elProduto1 = document.getElementById('produto1');
const elPreco1 = document.getElementById('preco1');
elProduto1.querySelector('.nome').textContent = nomeProduto1;
elPreco1.textContent = `R$ ${precoProduto1.toFixed(2)}`;
if (statusProduto1 != "Em Estoque") {
  elProduto1.classList.add('esgotado');
  elProduto1.classList.remove('disponivel');
} else {
  elProduto1.classList.add('disponivel');
}

// Manipulação DOM - Produto 2
const elProduto2 = document.getElementById('produto2');
const elPreco2 = document.getElementById('preco2');
elProduto2.querySelector('.nome').textContent = nomeProduto2;
elPreco2.textContent = `R$ ${precoProduto2.toFixed(2)}`;
if (precoProduto2 > 10) {
  elProduto2.classList.add('premium');
  elProduto2.classList.remove('padrao');
} else {
  elProduto2.classList.add('padrao');
  elProduto2.classList.remove('premium');
}

// Manipulação DOM - Produto 3
const elProduto3 = document.getElementById('produto3');
const elPreco3 = document.getElementById('preco3');
elProduto3.querySelector('.nome').textContent = nomeProduto3;
elPreco3.textContent = `R$ ${precoProduto3.toFixed(2)}`;
if (statusProduto3 != "Em Estoque") {
  elProduto3.classList.add('esgotado');
  elProduto3.classList.remove('disponivel');
} else {
  elProduto3.classList.add('disponivel');
}

// Loop de Promoção Relâmpago em 10 unidades
for (let i = 1; i <= 10; i++) {
  if (i % 2 == 0) {
    console.log(`Unidade ${i}: PROMOÇÃO! (Com R$ 1,00 de desconto)`);
  } else {
    console.log(`Unidade ${i}: Preço Normal.`);
  }
}