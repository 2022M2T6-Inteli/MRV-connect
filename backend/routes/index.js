const express = require("express");
const db = require('../utils/db');

//middleware de roteamento
const router = express.Router();


router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM servico`

        db.all(sql, (err, rows) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }else{
                res.render("login/index", {servicos: rows});
            }
        });
});

module.exports = router;