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

    let sql = `
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
        }else if(rows !== undefined){
            res.render("MRV_admin/usuario-logado-admin");
        };
    });

    console.log("oi");

    sql = `
    SELECT *
    FROM administrador_mrv
    WHERE
        senha = ? and
        email = ?`;
        
    db.get(sql, [senha, email], (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: bobao " + err.message);
            return;
        }else if(rows !== undefined){
            res.render("MRV_admin/usuario-logado-admin");
        }else{
            res.render("login/login");
        };
    });


});

//exporta a rota para poder ser requisitada no app.js
module.exports = router;