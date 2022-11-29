//requisição express + banco de dados
const express = require("express");
const db = require('../utils/db');

//middleware de roteamento
const router = express.Router();

//encaminha para a página de adicionar obras
router.all("/", (req, res) => {
    res.render("MRV_admin/modal-adicionarobra");
});

//insere um novo usuário no banco de dados
router.post("/inserirObra", (req, res) => {
    let nomeObra = req.body["nomeObra"];
    let logradouro = req.body["logradouro"];
    let bairro = req.body["bairro"];
    //let cidade = req.body["cidade"];
    //let estado = req.body["estado"];
    //let dataInicio = req.body["dataInicio"];
    //let dataEntrega = req.body["dataEntrega"];
    //let especialidade = req.body["especialidade"];
    let numero = req.body["numero"];
    let descricao = req.body["descricao"];

    const sql = "INSERT INTO servico (nome, logradouro, bairro, numero, descricao) VALUES ('"+req.body.nomeObra+"', '"+req.body.logradouro+"', '"+req.body.bairro+"', '"+req.body.numero+"', '"+req.body.descricao+"')";

    console.log(sql);

    db.run(sql, [nomeObra, logradouro, bairro, numero, descricao], (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        res.json(rows);
    });
});

//exporta cadastro para a api.js
module.exports = router;