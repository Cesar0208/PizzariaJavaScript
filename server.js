const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [
    {id:1, nome: 'Cleber', email:'cleber@gamil.com'},
    {id:2, nome: 'Pedro', email:'pedro@gmail.com'},
    {id:3, nome: 'João', email:'joao@gmail.com'}
];

let produtos = [
    {
        id: 1,
        nome: "Margherita",
        preco: 42.90,
        descricao: "A clássica pizza italiana com molho de tomate, muçarela fresca, manjericão e azeite. Simples e deliciosa.",
        estoque: "Em estoque"
    },
    {
        id: 2,
        nome: "Marinara",
        preco: 38.90,
        descricao: "Molho de tomate, alho, orégano e azeite. A pizza dos pescadores, sem queijo mas cheia de sabor.",
        estoque: "Em estoque"
    },
    {
        id: 3,
        nome: "Diavola",
        preco: 46.90,
        descricao: "Molho de tomate, muçarela, salame picante e pimenta. Para quem gosta de um toque ardido.",
        estoque: "Fora de estoque"
    },
    {
        id: 4,
        nome: "Quattro Stagioni",
        preco: 52.90,
        descricao: "Dividida em quatro partes: alcachofras, azeitonas, cogumelos e presunto. As quatro estações em uma pizza.",
        estoque: "Em estoque"
    },
    {
        id: 5,
        nome: "Quattro Formaggi",
        preco: 49.90,
        descricao: "Uma conbinação celestial de quatro queijos: muçarela, gorgonzola, parmesão e fontina.",
        estoque: "Em estoque"
    },
    {
        id: 6,
        nome: "Prosciutto e Funghi",
        preco: 47.90,
        descricao: "Presunto cru italiano e cogumelos frescos sobre uma base de muçarela derretida.",
        estoque: "Fora de estoque"
    },
    {
        id: 7,
        nome: "Capricciosa",
        preco: 51.90,
        descricao: "Presunto, cogumelos, alcachofras, azeitonas e ovos. Uma pizza cheia de personalidade.",
        estoque: "Em estoque"
    },
    {
        id: 8,
        nome: "Ortolana",
        preco: 44.90,
        descricao: "Berinjela, abobrinha, pimentões grelhados e muçarela. A opção vegetariana perfeita.",
        estoque: "Em estoque"
    }
];

// Área de usuários
// GET usuários
app.get("/usuarios", (req, res) => {
    res.json({
        mensagem: "Lista de usuários",
        data: usuarios,
        total: usuarios.length
    });
});

// GET usuário por ID
app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if(!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado",
            error: true
        });
    }

    res.json({
        mensagem: "Usuário encontrado",
        data: usuario
    });
});


// DELETE do usuário por ID
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    
    if (usuarioIndex === -1) {
        return res.status(404).json({
        mensagem: "Usuário não encontrado",
        error: true
        });
    }
    
    const usuarioRemovido = usuarios.splice(usuarioIndex, 1)[0];
    
    res.json({
        mensagem: "Usuário removido com sucesso",
        data: usuarioRemovido
    });
});

//
app.post('/produtos', (req, res) => {
    console.log('POST /produtos - Criando novo produto');
    const { nome, preco, descricao, estoque } = req.body;

    if (!nome || !preco || !descricao || !estoque) {
        return res.status(400).json({ mensagem: 'Nome, preço, descrição e estoque são obrigatórios', error: true });
    }

    const novoId = produtos.length ? Math.max(...produtos.map(u => u.id)) + 1 : 1;
    const novoProduto = { id: novoId, nome, preco, descricao, estoque };
    produtos.push(novoProduto);

    res.status(201).json({ mensagem: 'Produto criado com sucesso', data: novoProduto});
});

app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PUT /produtos - Atualizando produtos`);
  
  const produtosIndex = produtos.findIndex(u => u.id === id);
  
  if (produtosIndex === -1) {
    return res.status(404).json({
      mensagem: "produto não encontrado",
      error: true
    });
  }
  
  const { nome, preco, descricao, estoque } = req.body;
  
  if (!nome || !preco || !descricao || !estoque) {
    return res.status(400).json({
      mensagem: "Nome, preço, descrição são obrigatórios",
      error: true
    });
  }
  
  // Atualizar usuário
  produtos[produtosIndex] = { id, nome, preco, descricao, estoque };
  
  res.json({
    mensagem: "produto atualizado com sucesso",
    data: produtos[produtosIndex]
  });
});
// Abrindo o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})