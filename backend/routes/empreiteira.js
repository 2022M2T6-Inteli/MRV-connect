//requisição express + banco de dados
const express = require("express");
//middleware de roteamento

const db = require('../utils/db');
//middleware de roteamento
const router = express.Router();
router.get()
router.get("/perfilEmpreiteira", (req, res) => {
    let id_empreiteira = req.query["id_empreiteira"];
    const sql = `
        SELECT *
        FROM empreiteira
        WHERE
            id_empreiteira = ?`
        db.get(sql, [id_empreiteira], (err, row) =>{
            if(err) {
                console.error(err.message);
                res.send("Erro: " + err.message);
                return;
            }
            console.log(row);
            res.render("/", {obra: row});
        });
});
router.post("/editarPerfilEmpreiteira", (req, res) => {
    let id_empreiteira = req.query["id_empreiteira"];
    let id_cidade = req.body["id_cidade"];
    let cnpj = req.body["cnpj"];
    let data_de_abertura = req.body["data_de_abertura"];
    let razao_social = req.body["razao_social"];
    let nome_fantasia = req.body["nome_fantasia"];
    let qtd_funcionario = req.body["qtd_funcionario"];
    let logradouro = req.body["logradouro"];
    let numero = req.body["numero"];
    let bairro = req.body["bairro"];
    let telefone = req.body["telefone"];
    let email = req.body["email"];
    let senha = req.body["senha"];
    let descricao = req.body["descricao"];
    //const sql = "UPDATE servico SET nome='" + req.body.nome + "', logradouro='"+req.body.logradouro+"', bairro='"+req.body.bairro+"', data_abertura='"+req.body.data_abertura+"', data_finadlizacao='"+req.body.data_finadlizacao+"', numero='"+req.body.numero+"', descricao='"+req.body.descricao+"' WHERE id_servico='"+req.body.id_servico+"'";
    const sql = `UPDATE empreiteira
                    SET
                        id_empreiteira=?
                        id_cidade=?,
                        cnpj=?,
                        data_de_abertura=?,
                        razao_social=?,
                        nome_fantasia=?,
                        qtd_funcionario=?,
                        logradouro=?,
                        numero=?,
                        bairro=?,
                        telefone=?,
                        email=?,
                        senha=?,
                        descricao=?,
                    WHERE id_empreiteira=?`;
    db.run(sql, [id_empreiteira, id_cidade, cnpj, data_de_abertura, razao_social, nome_fantasia, qtd_funcionario, logradouro, numero, bairro, telefone, email, senha, descricao], (err, rows) => {
		if (err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        res.redirect("/");
	});
});
module.exports = router;