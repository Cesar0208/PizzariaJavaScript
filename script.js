let produto1 = {
    nome: "Margherita",
    preco: 10.99,
    descricao: "Pizza Margherita",
    estoque: "Em estoque"
}

// Seleciona todos os botões de abrir e fechar
const botoesAbrir = document.querySelectorAll('.abrir-btn');
const botoesFechar = document.querySelectorAll('.fechar-btn');

// Adiciona evento para cada botão "Abrir"
botoesAbrir.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const aboutDiv = document.getElementById(targetId);
        aboutDiv.style.display = 'flex';
        // Reseta o scroll para o topo quando abre
        const aboutContent = aboutDiv.querySelector('.about-content');
        aboutContent.scrollTop = 0;
    });
});

// Adiciona evento para cada botão "Fechar"
botoesFechar.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const aboutDiv = e.target.closest('.about');
        aboutDiv.style.display = 'none';
    });
});

// Fecha o about clicando fora dele
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('about')) {
        e.target.style.display = 'none';
    }
});