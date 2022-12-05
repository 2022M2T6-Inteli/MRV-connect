const { ERROR } = require("sqlite3");
const db = require("../utils/db");

class MrvUser {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  async criar() {
    const sql = `
            INSERT INTO administrador_mrv
            (nome, email, senha)
            VALUES (?, ?, ?)`;

    //const dbInstance = await db1.db();

    const insertion = await db.run(sql, [
      this.nome,
      this.email,
      this.senha,
    ]);

    if (insertion.changes === 0) {
        console.log("erro")
      throw new Error("database error");
    }

    const success = "usuário MRV cadastrado!"
    return success;
  };
};

module.exports = { MrvUser };
