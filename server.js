const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [
    {id:1, nome: 'Cleber', email:'cleber@gamil.com'},
    {id:2, nome: 'Pedro', email:'pedro@gmail.com'},
    {id:3, nome: 'João', email:'joao@gmail.com'}
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


// Abrindo o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})