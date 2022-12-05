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
//Testa a primeira vez para empreiteira e a segunda para administrador MRV
router.post("/autenticacao", (req, res) => {
    let email = req.body["email"];
    let senha = req.body["senha"];

    console.log(email + ":" + senha);

    let sql = `
        SELECT id_empreiteira
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
            res.redirect("../admin/listarServico?id_empreiteira="+rows["id_empreiteira"]);
        };
    });

    console.log("oi");

    sql = `
    SELECT id_administrador
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
            console.log(rows["id_administrador"]);
            console.log(rows);
            res.redirect("../admin/listarServico?id_administrador="+rows["id_administrador"]);
        }else{
            console.log(rows);
            res.render("login/login");
        };
    });


});

//exporta a rota para poder ser requisitada no app.js
module.exports = router;