//requisição express + banco de dados
const express = require("express");
const db = require('../utils/db');

//middleware de roteamento
const router = express.Router();

//encaminha para a página de login
router.all("/", (req, res) => {
    res.render("login/login");
});
//autenticacão do login
router.post("/autenticacao", (req, res) => {
    let email = req.body["email"];
    let senha = req.body["senha"];
    console.log(senha);
    const sql = `
        SELECT * 
        FROM empreiteira 
        WHERE 
            senha=? AND 
            email=?`;

    console.log(sql);

    db.get(sql, [senha, email], (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: bobao " + err.message);
            return;
        }
        //res.json(rows);
        //se não possuir conta, volta para a página de login
        if (rows === undefined) {
            res.render("login/login");
        };
        //encaminha para a página feed do admin da mrv
        res.render("MRV_admin/usuario-logado-admin");
    });
});

//exporta a rota para poder ser requisitada no app.js
module.exports = router;