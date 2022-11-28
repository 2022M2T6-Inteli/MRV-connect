const express = require("express");
const db = require('../utils/db');

const router = express.Router();

router.all("/", (req, res) => {
    res.render("login/cadastro");
});

router.post("/inserirCadastro", (req, res) => {
    let nomeEmpresa = req.body["nomeEmpresa"];
    let cnpjEmpresa = req.body["cnpjEmpresa"];
    let contato = req.body["contato"];
    let email = req.body["email"];

    const sql = "INSERT INTO empreiteira (nome_fantasia, cnpj, telefone, email) VALUES (?, ?, ?, ?)";

    console.log(sql);

    db.run(sql, [nomeEmpresa, cnpjEmpresa, contato, email], (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        res.json(rows);
    });
});

module.exports = router;