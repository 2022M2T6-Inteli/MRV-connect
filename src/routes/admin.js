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

    const sql = "INSERT INTO servico (nome, logradouro, bairro) VALUES ('"+req.body.nomeObra+"', '"+req.body.logradouro+"', '"+req.body.bairro+"')";

    console.log(sql);

    db.run(sql, (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        res.json(rows);
    });
});

//rota para consultar uma obra
router.get("/getObra", (req, res) => {
    let id_servico = req.query["id_servico"];

    const sql = `
        SELECT *
        FROM servico
        WHERE
            id_servico = ?`

        db.get(sql, [id_servico], (err, rows) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }
            console.log(rows);
            res.json(rows);
        });
});

//exporta cadastro para a api.js
module.exports = router;