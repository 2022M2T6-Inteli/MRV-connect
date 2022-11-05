const express = require('express'); 
const app = express();
//const { app } = require('express');
//const app = express.app();
const hostname = '127.0.0.1';
const port = 3021;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'BFS.db'; //use o nome que você achar melhor para o banco de dados

app.get('/', (req, res) => {
    res.sendFile("C:/Users/luiz_/Documentos/inteli/modulo02/projetos/backend" + '/index.html');
    console.log(__dirname)
});

app.use(express.json());

app.get('/empreiteiras', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    // var sql = 'SELECT cod_empreiteira, cod_estado, cnpj, data_de_abertura, razao_social, nome_fantasia, qtd_funcionario, logradouro, numero, bairro, cnae, telefone, email FROM empreiteiras ORDER BY cod_empreiteira DESC';
    var sql = 'SELECT cod_empreiteira, empreiteiras.cod_estado, cod_cidade, nome_estado, cnpj, data_de_abertura, razao_social, nome_fantasia, qtd_funcionario, logradouro, numero, bairro, cnae, telefone, email FROM empreiteiras INNER JOIN estados ON empreiteiras.cod_estado = estados.cod_estado';
    //ORDER BY cod_empreiteira DESC';
    console.log(sql)
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        console.log(rows)
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/add/empreiteiras', function(req,res){
    console.log(req.body);
    //Puxa todos os valores para as variaveis em seguida, tendo que colocalas no nome no html
    const{cod_estado, cod_cidade, cnpj, data_de_abertura, razao_social, nome_fantasia, qtd_funcionario, logradouro, numero, bairro, cnae, telefone, email} = req.body;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    //inserindo na tabela formacao em curso, data de inicio e data de formação os valores respectivamente curso, data inicio e data formação que foram colocados lá no html
    var sql = `INSERT INTO empreiteiras ( cod_estado, cod_cidade, cnpj, data_de_abertura, razao_social, nome_fantasia, qtd_funcionario, logradouro, numero, bairro, cnae, telefone, email) values ('${cod_estado}', '${cod_cidade}','${cnpj}', '${data_de_abertura}', '${razao_social}', '${nome_fantasia}', '${qtd_funcionario}', '${logradouro}', '${numero}', '${bairro}', '${cnae}', '${telefone}', '${email}')`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>EMPREITEIRA ADICIONADA COM SUCESSO!</p>');
    });
    //res.write('<p>EMPREITEIRA ADICIONADA COM SUCESSO!</p>');
    db.close(); 
});

app.get('/refresh/empreiteiras', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_empreiteira, cod_estado, cnpj, data_de_abertura, razao_social, nome_fantasia, qtd_funcionario, logradouro, numero, bairro, cnae, telefone, email FROM empreiteiras ORDER BY cod_empreiteira DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/refresh/empreiteiras', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_empreiteira, qtd_funcionario, logradouro, numero, bairro, telefone} = req.body;
    // Abaixo, atualizará somente o curso, porém se tirasse o where, atualizaria TODOS OS CURSOS DOS USUARIOS'

    var sql = `UPDATE empreiteiras set`;
    if(qtd_funcionario!=''){
        sql += ` qtd_funcionario='${qtd_funcionario}'`;
    };
    if(logradouro!=''){
        sql += `, logradouro='${logradouro}'`;
    };
    if(numero!=''){
        sql += `, numero='${numero}'`;
    };
    if(bairro!=''){
        sql += `, bairro='${bairro}'`;
    };
    if(telefone!=''){
        sql += `, bairro='${bairro}'`;
    };
    sql+= ` WHERE cod_empreiteira='${cod_empreiteira}'`
    //substitui uma coisa por outra
    console.log(sql)
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>EMPREITEIRA ATUALIZADA COM SUCESSO!</p>');
    });
    db.close(); 

});

app.delete('/delete/empreiteiras', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_empreiteira} = req.body;
    var sql = `DELETE FROM empreiteiras WHERE cod_empreiteira='${cod_empreiteira}'`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>EMPREITEIRA DELETADA COM SUCESSO!</p>');
    });
    
    db.close(); 

});

app.get('/usuarios', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_usuario, cod_empreiteira, email, senha, is_admin FROM usuarios ORDER BY cod_usuario DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/add/usuarios', function(req,res){
    console.log(req.body);
    //Puxa todos os valores para as variaveis em seguida, tendo que colocalas no nome no html
    const{cod_empreiteira, email, senha, is_admin} = req.body;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    //inserindo na tabela formacao em curso, data de inicio e data de formação os valores respectivamente curso, data inicio e data formação que foram colocados lá no html
    var sql = `INSERT INTO usuarios (cod_empreiteira, email, senha, is_admin) values('${cod_empreiteira}','${email}','${senha}', '${is_admin}')`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>USUARIO ADICIONADO COM SUCESSO!</p>');
    });
    
    db.close(); 
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/refresh/usuarios', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_usuario, cod_empreiteira, email, senha, is_admin FROM usuarios ORDER BY cod_usuario DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/refresh/usuarios', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_empreiteira, email, senha, is_admin} = req.body;
    // Abaixo, atualizará somente o curso, porém se tirasse o where, atualizaria TODOS OS CURSOS DOS USUARIOS'

    var sql = `UPDATE usuarios set`;
    if(email!=''){
        sql += ` email='${email}'`;
    };
    if(senha!=''){
        sql += `, senha='${senha}'`;
    };
    if(is_admin!=''){
        sql += `, is_admin='${is_admin}'`;
    };
    
    sql+= ` WHERE cod_empreiteira='${cod_empreiteira}'`
    //substitui uma coisa por outra
    console.log(sql)
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>USUARIO ATUALIZADO COM SUCESSO!</p>');
    });
    db.close(); 

});

app.delete('/delete/usuarios', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_usuario} = req.body;
    var sql = `DELETE FROM usuarios WHERE cod_usuario='${cod_usuario}'`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>USUARIO DELETADO COM SUCESSO!</p>');
    });
    db.close(); 

});

app.get('/estados', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_estado, nome_estado FROM estados ORDER BY cod_estado DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/add/estados', function(req,res){
    console.log(req.body);
    //Puxa todos os valores para as variaveis em seguida, tendo que colocalas no nome no html
    const{cod_estado, nome_estado} = req.body;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    //inserindo na tabela formacao em curso, data de inicio e data de formação os valores respectivamente curso, data inicio e data formação que foram colocados lá no html
    var sql = `INSERT INTO estados (cod_estado, nome_estado) values('${cod_estado}','${nome_estado}')`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>ESTADO ADICIONADO COM SUCESSO!</p>');
    });
    db.close(); 
});

app.get('/refresh/estados', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_estado, nome_estado FROM estados ORDER BY cod_estado DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/refresh/estados', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_estado, nome_estado} = req.body;
    // Abaixo, atualizará somente o curso, porém se tirasse o where, atualizaria TODOS OS CURSOS DOS USUARIOS'

    var sql = `UPDATE estados set`;
    if(nome_estado!=''){
        sql += ` nome_estado='${nome_estado}'`;
    };
    
    sql+= ` WHERE cod_estado='${cod_estado}'`
    //substitui uma coisa por outra
    console.log(sql)
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>ESTADO ATUALIZADO COM SUCESSO!</p>');
    });
    db.close(); 

});

app.delete('/delete/estados', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_estado} = req.body;
    var sql = `DELETE FROM estados WHERE cod_estado='${cod_estado}'`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>ESTADOS DELETADO COM SUCESSO!</p>');
    });
    db.close(); 

});

app.get('/cidades', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_cidade, cod_estado, nome_cidade FROM cidades ORDER BY cod_estado DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/cidades2_rota2', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql2 = 'SELECT * FROM empreiteiras INNER JOIN cidades ON empreiteiras.cod_cidade = cidades.cod_cidade ORDER BY cod_cidade DESC';
    db.all(sql2, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/add/cidades', function(req,res){
    console.log(req.body);
    //Puxa todos os valores para as variaveis em seguida, tendo que colocalas no nome no html
    const{cod_cidade, nome_cidade, cod_estado} = req.body;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    //inserindo na tabela formacao em curso, data de inicio e data de formação os valores respectivamente curso, data inicio e data formação que foram colocados lá no html
    var sql = `INSERT INTO cidades (cod_cidade, cod_estado, nome_cidade) values('${cod_cidade}','${cod_estado}','${nome_cidade}')`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>CIDADE ADICIONADA COM SUCESSO!</p>');
    });
    db.close(); 
});

app.get('/refresh/cidades', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_cidade, cod_estado, nome_cidade FROM cidades ORDER BY cod_estado DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/refresh/cidades', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_cidade, nome_cidade, cod_estado} = req.body;
    // Abaixo, atualizará somente o curso, porém se tirasse o where, atualizaria TODOS OS CURSOS DOS USUARIOS'

    var sql = `UPDATE cidades set`;
    if(nome_cidade!=''){
        sql += ` nome_cidade='${nome_cidade}'`;
    };
    if(cod_estado!=''){
        sql += `, cod_estado='${cod_estado}'`;
    };
    
    sql+= ` WHERE cod_cidade='${cod_cidade}'`
    //substitui uma coisa por outra
    console.log(sql)
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>CIDADE ATUALIZADA COM SUCESSO!</p>');
    });
    db.close(); 

});

app.delete('/delete/cidades', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_cidade} = req.body;
    var sql = `DELETE FROM cidades WHERE cod_cidade='${cod_cidade}'`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>CIDADE DELETADA COM SUCESSO!</p>');
    });
    db.close(); 

});

app.get('/inscricoes', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_inscricao, cod_projeto, cod_empreiteira, cod_status FROM inscricoes ORDER BY cod_inscricao DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/add/inscricoes', function(req,res){
    console.log(req.body);
    //Puxa todos os valores para as variaveis em seguida, tendo que colocalas no nome no html
    const{cod_inscricao, cod_projeto, cod_empreiteira, cod_status} = req.body;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    //inserindo na tabela formacao em curso, data de inicio e data de formação os valores respectivamente curso, data inicio e data formação que foram colocados lá no html
    var sql = `INSERT INTO inscricoes (cod_inscricao, cod_projeto, cod_empreiteira, cod_status) values('${cod_inscricao}','${cod_projeto}','${cod_empreiteira}','${cod_status}')`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>INSCRIÇÃO ADICIONADA COM SUCESSO!</p>');
    });
    db.close(); 
});

app.get('/refresh/inscricoes', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_inscricao, cod_projeto, cod_empreiteira, cod_status FROM inscricoes ORDER BY cod_inscricao DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/refresh/inscricoes', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_inscricao, cod_projeto, cod_empreiteira, cod_status} = req.body;
    // Abaixo, atualizará somente o curso, porém se tirasse o where, atualizaria TODOS OS CURSOS DOS USUARIOS'

    var sql = `UPDATE inscricoes set`;
    if(cod_inscricao!=''){
        sql += ` cod_inscricao='${cod_inscricao}'`;
    };
    if(cod_projeto!=''){
        sql += `, cod_projeto='${cod_projeto}'`;
    };
    if(cod_empreiteira!=''){
        sql += `, cod_empreiteira='${cod_empreiteira}'`;
    };
    if(cod_status!=''){
        sql += `, cod_status='${cod_status}'`;
    };
    
    sql+= ` WHERE cod_inscricao='${cod_inscricao}'`
    //substitui uma coisa por outra
    console.log(sql)
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>INSCRIÇÃO ATUALIZADO COM SUCESSO!</p>');
    });
    db.close(); 

});

app.delete('/delete/inscricoes', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_inscricao} = req.body;
    var sql = `DELETE FROM inscricoes WHERE cod_inscricao='${cod_inscricao}'`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>INSCRIÇÃO DELETADA COM SUCESSO!</p>');
    });
    db.close(); 

});

app.get('/projetos', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_projeto, cod_estado, logradouro, bairro, tamanho_da_obra, especialidade_obra, data_inicio, data_fim, descricao, imagem_link  FROM projetos ORDER BY cod_projeto DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/add/projetos', function(req,res){
    console.log(req.body);
    //Puxa todos os valores para as variaveis em seguida, tendo que colocalas no nome no html
    const{cod_projeto, cod_estado, cod_cidade, logradouro, bairro,tamanho_da_obra, especialidade_obra,data_inicio,data_fim, descricao,imagem_link} = req.body;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    //inserindo na tabela formacao em curso, data de inicio e data de formação os valores respectivamente curso, data inicio e data formação que foram colocados lá no html
    var sql = `INSERT INTO projetos (cod_projeto, cod_estado, cod_cidade, logradouro, bairro, tamanho_da_obra, especialidade_obra, data_inicio,data_fim, descricao,imagem_link) values('${cod_projeto}', '${cod_estado}', '${cod_cidade}', '${logradouro}', '${bairro}','${tamanho_da_obra}', '${especialidade_obra}','${data_inicio}','${data_fim}', '${descricao}','${imagem_link}')`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>PROJETO ADICIONADO COM SUCESSO!</p>');
    });
    db.close(); 
});

app.get('/refresh/projetos', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT cod_projeto, cod_estado, logradouro, bairro, tamanho_da_obra, especialidade_obra, data_inicio, data_fim, descricao, imagem_link  FROM projetos ORDER BY cod_projeto DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/refresh/projetos', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_projeto, cod_estado, cod_cidade, logradouro, bairro, tamanho_da_obra, especialidade_obra, data_inicio, data_fim, descricao, imagem_link} = req.body;
    // Abaixo, atualizará somente o curso, porém se tirasse o where, atualizaria TODOS OS CURSOS DOS USUARIOS'

    var sql = `UPDATE projetos set`;
    if(cod_projeto!=''){
        sql += ` cod_projeto='${cod_projeto}'`;
    };
    if(cod_estado!=''){
        sql += `, cod_estado='${cod_estado}'`;
    };
    if(cod_cidade!=''){
        sql += `, cod_cidade='${cod_cidade}'`;
    };
    if(logradouro!=''){
        sql += `, logradouro='${logradouro}'`;
    };
    if(bairro!=''){
        sql += `, bairro='${bairro}'`;
    };
    if(tamanho_da_obra!=''){
        sql += `, tamanho_da_obra='${tamanho_da_obra}'`;
    };
    if(especialidade_obra!=''){
        sql += `, especialidade_obra='${especialidade_obra}'`;
    };
    if(data_inicio!=''){
        sql += `, data_inicio='${data_inicio}'`;
    };
    if(data_fim!=''){
        sql += `, data_fim='${data_fim}'`;
    };
    if(descricao!=''){
        sql += `, descricao='${descricao}'`;
    };
    if(imagem_link!=''){
        sql += `, imagem_link='${imagem_link}'`;
    };

    sql+= ` WHERE cod_projeto='${cod_projeto}'`
    //substitui uma coisa por outra
    console.log(sql)
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>PROJETO ATUALIZADO COM SUCESSO!</p>');
    });
    db.close(); 

});

app.delete('/delete/projetos', function(req,res){
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const{cod_projeto} = req.body;
    var sql = `DELETE FROM projetos WHERE cod_projeto='${cod_projeto}'`;
    db.all(sql, [],(err, rows)=>{
        if(err){
            //criar um alerta e travar a aplicação
            res.json(err.message);
        }
        res.send('<p>PROJETO DELETADO COM SUCESSO!</p>');
    });
    db.close(); 

});
module.exports = app;

/* Inicia o servidor */
app.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});