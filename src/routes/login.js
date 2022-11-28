const express = require("express");
const db = require('../utils/db');

const router = express.Router();

router.all("/", (req, res) => {
    res.render("login/login");
});

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
        if (rows === undefined) {
            res.render("login/login");
        };
        res.render("MRV_admin/usuario-logado-admin");
    });
});

module.exports = router;