//requisição express + banco de dados
const express = require("express");
const db = require('../utils/db');
//middleware de roteamento
const router = express.Router();
//renderiza a página de cadastro
router.all("/", (req, res) => {
    res.render("login/cadastro");
});
//insere uma nova empreiteira no banco de dados
router.post("/inserirCadastro", (req, res) => {
    let nomeEmpresa = req.body["nomeEmpresa"];
    let cnpjEmpresa = req.body["cnpjEmpresa"];
    let contato = req.body["contato"];
    let email = req.body["email"];
    let senha = req.body["senha"];

    const sql = "INSERT INTO empreiteira (nome_fantasia, cnpj, telefone, email, senha) VALUES (?, ?, ?, ?, ?)";

    console.log(sql);
//TESTE
//Mostra todas as informações do usuário
    db.run(sql, [nomeEmpresa, cnpjEmpresa, contato, email, senha], (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        res.redirect("/login");
    });
});

//exporta cadastro para a api.js
module.exports = router;