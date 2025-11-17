const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [
    {id:1, nome: 'Cleber', email:'cleber@gamil.com'},
    {id:2, nome: 'Pedro', email:'pedro@gmail.com'},
    {id:3, nome: 'João', email:'joao@gmail.com'}
];

// Contador global para garantir que os IDs sejam sequenciais e únicos
let nextId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

// Área de usuários

// POST um novo usuário
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !email) {
        return res.status(400).json({
            mensagem: "Erro: Nome e Email são obrigatórios para criar um usuário.",
            data: null
        });
    }

    // Cria o novo suário com um ID único
    const novoUsuario = {
        id: nextId++,
        nome: nome,
        email: email
    };

    // Adiciona ao banco de dados em memória
    usuarios.push(novoUsuario);

    // mensagem de sucesso
    res.status(201).json({
        mensagem: "Usuário criado com sucesso.",
        data: novoUsuario
    });
});


// (PATCH) Atualizar um usuário por id
// URL: /usuarios/:id
app.patch('/usuarios/:id', (req, res) => {
    // Pega o ID da URL e converte para número
    const id = parseInt(req.params.id);
    // Pega os campos a serem atualizados do corpo
    const updates = req.body;

    // 1. Encontra o índice do usuário no array
    const index = usuarios.findIndex(u => u.id === id);

    // 2. Verifica se o usuário existe
    if (index === -1) {
        return res.status(404).json({
            mensagem: `Erro: Usuário com ID ${id} não encontrado.`,
            data: null
        });
    }

    // Pega o usuário existente
    let usuarioAtual = usuarios[index];

    // Aplica as atualizações de forma parcial
    const usuarioAtualizado = Object.assign(usuarioAtual, updates);
    
    // Atualiza o array
    usuarios[index] = usuarioAtualizado;

    // Retorna a resposta de sucesso
    res.json({
        mensagem: "Usuário atualizado com sucesso.",
        data: usuarioAtualizado
    });
});

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


// Abrindo o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})