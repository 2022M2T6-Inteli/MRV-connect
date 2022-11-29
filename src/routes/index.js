const express = require("express");
const db = require('../utils/db');

const router = express.Router();

router.get("/", (req, res) => {
    const sql = "Select * FROM empreiteira";

    console.log(sql);

    db.get(sql, (err, rows) =>{
        if(err) {
            console.error(err.message);
            res.send("Erro: " + err.message);
            return;
        }
        console.log(rows);
        res.json(rows);
    });
});

module.exports = router;