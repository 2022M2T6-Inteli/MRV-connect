const express = require("express");
const db = require('../utils/db');

//middleware de roteamento
const router = express.Router();


router.get("/empreiteira", (req, res) => {
    let id_empreiteira = req.query["id_empreiteira"];

    const sql = `
        SELECT *
        FROM servico`

        db.all(sql, (err, rows) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }else{
                res.render("empreiteira/empreiteira_logado", {servicos: rows});
            }
        });
});

router.get("/mrv", (req, res) => {
    let id_administrador = req.query["id_administrador"];

    const sql = `
        SELECT *
        FROM servico`

    db.all(sql, (err, rows) => {
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }else{
            console.log(rows);
            res.render("mrv_admin/userMrv_feed", {servicos: rows});
        };
    });
});

module.exports = router;