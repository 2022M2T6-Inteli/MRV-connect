const service = require("../services/mrvUser");
const { body, validationResult } = require("express-validator");

const criarMrvUser = (req, res) => {
  const { nome, email, senha } = req.body;

  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(404).json({ error: err.errors[0].msg });
  }

  const mrvUser = new service.MrvUser(nome, email, senha);

  mrvUser
    .criar()
    .then((resul) => {
      res.status(200).json({ message: resul });
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
};

module.exports = {criarMrvUser};