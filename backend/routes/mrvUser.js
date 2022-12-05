const express = require("express");
const db = require("../utils/db");
const controller = require("../controllers/mrvUser");
const { body, validationResul } = require("express-validator");

const router = express.Router();

router.post(
  "/criar",
  [body("nome", "nome não enviado").exists({ checkFalsy: true })],
  [body("email", "email não enviado").exists({ checkFalsy: true })],
  [body("senha", "senha não enviada").exists({ checkFalsy: true })],
  controller.criarMrvUser
);

module.exports = router;
