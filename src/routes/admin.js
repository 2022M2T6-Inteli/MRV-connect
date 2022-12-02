//requisição express + banco de dados
const express = require("express");
const db = require('../utils/db');

//middleware de roteamento
const router = express.Router();

//encaminha para a página de adicionar obras
router.all("/", (req, res) => {
    res.render("mrv_admin/criar_servico");
});

//insere um novo usuário no banco de dados
router.post("/criarServico", (req, res) => {
    let nome = req.body["nome"];
    let logradouro = req.body["logradouro"];
    let bairro = req.body["bairro"];
    //let cidade = req.body["cidade"];
    //let estado = req.body["estado"];
    let data_abertura = req.body["data_abertura"];
    let data_finadlizacao = req.body["data_finadlizacao"];
    //let especialidade = req.body["especialidade"];
    let numero = req.body["numero"];
    let descricao = req.body["descricao"];

    const sql = "INSERT INTO servico (nome, logradouro, bairro, data_abertura, data_finadlizacao, numero, descricao) VALUES ('"+req.body.nome+"', '"+req.body.logradouro+"', '"+req.body.bairro+"', '"+req.body.data_abertura+"', '"+req.body.data_finadlizacao+"', '"+req.body.numero+"', '"+req.body.descricao+"')";

    console.log(sql);

    db.run(sql, (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        res.redirect("/admin/listarServico");
    });
});

//preenche as informações do serviço em seus determinados campos
//Apenas para o administrador
router.get("/editarServico", (req, res) => {
    let id_servico = req.query["id_servico"];

    const sql = `
        SELECT *
        FROM servico
        WHERE
            id_servico = ?`

        db.get(sql, [id_servico], (err, row) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }
            console.log(row);
            res.render("mrv_admin/editar_servico2", {obra: row});
        });
});
//Atualiza o serviço e inser no banco de dados
//apenas para o administrador
router.post("/editarServico", (req, res) => {
    let id_servico = req.body["id_servico"];
    let nome = req.body["nome"];
    let logradouro = req.body["logradouro"];
    let bairro = req.body["bairro"];
    let data_abertura = req.body["data_abertura"];
    let data_finadlizacao = req.body["data_finadlizacao"];
    let numero = req.body["numero"];
    let descricao = req.body["descricao"];

    //const sql = "UPDATE servico SET nome='" + req.body.nome + "', logradouro='"+req.body.logradouro+"', bairro='"+req.body.bairro+"', data_abertura='"+req.body.data_abertura+"', data_finadlizacao='"+req.body.data_finadlizacao+"', numero='"+req.body.numero+"', descricao='"+req.body.descricao+"' WHERE id_servico='"+req.body.id_servico+"'";
    const sql = `UPDATE servico 
                    SET 
                        nome=?, 
                        logradouro=?, 
                        bairro=?, 
                        data_abertura=?, 
                        data_finadlizacao=?,
                        numero=?, 
                        descricao=? 
                    WHERE id_servico=?`;

    console.log(sql);

    db.run(sql, [nome, logradouro, bairro, data_abertura, data_finadlizacao, numero, descricao, id_servico], (err, rows) => {
		if (err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        res.redirect("/admin/listarServico");
	});
});
    

//Lista o serviço no feed
//mesmo endpoint para a empreiteira como para o admin
router.all("/listarServico", (req, res) => {
    let id_empreiteira = req.query["id_empreiteira"];
    let id_administrador = req.query["id_administrador"];
    
    console.log(id_empreiteira + " : " + id_administrador);

    const sql = `
        SELECT *
        FROM servico`

        db.all(sql, (err, rows) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }
            console.log(rows)
            //redireciona para o feed necessário
            if (id_administrador != undefined){
                console.log(rows);
                res.render("mrv_admin/userMrv_feed", {servicos: rows});
            }else{
                res.render("empreiteira/empreiteira_logado", {servicos: rows});
            }
        });
});

//deletar um serviço do feed
router.get("/deletarServico", (req, res) => {
    let id_servico = req.query["id_servico"];
    const sql = `
        DELETE 
            FROM servico
            WHERE
                id_servico = ? `;


    db.all(sql, [id_servico], (err, row) => {
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        };  
        res.redirect("/admin/listarServico")
    });
})





//exporta cadastro para a api.js
module.exports = router;

