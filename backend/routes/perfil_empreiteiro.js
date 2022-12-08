//requisição express + banco de dados
const express = require("express");
const db = require('../utils/db');
//middleware de roteamento
const router = express.Router();

router.all("/", (req, res) => {
    res.render("empreiteira/perfil_empreiteiro");
});

router.get("/perfil", (req, res) => {
    let id_empreiteira = req.query["id_empreiteira"];

    const sql = "SELECT id_empreiteira, nome_fantasia, telefone, email cnpj FROM empreiteira WHERE id_empreiteira=?"

        db.get(sql, [id_empreiteira], (err, row) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }else{
                console.log(row)
                res.render("empreiteira/perfil_empreiteiro?id_empreiteira=", {empreiteiras: row, id:id_empreiteira});
                
                // ?id_empreiteira="+rows["id_empreiteira"]
            }
        });
});

module.exports = router;