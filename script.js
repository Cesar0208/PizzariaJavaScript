let produto1 = {
    nome: "Margherita",
    preco: 10.99,
    descricao: "Pizza Margherita",
    estoque: "Em estoque"
}

const about = document.getElementById('about');
const btnAbrir = document.getElementById('abrir');
const btnFechar = document.getElementById('fechar')

btnAbrir.addEventListener('click', () => {
    about.style.display = 'flex';
  });

  // Fecha a div  (esconde)
  btnFechar.addEventListener('click', () => {
    about.style.display = 'none';
  });