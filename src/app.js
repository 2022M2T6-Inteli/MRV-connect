const path = require("path");

require("dotenv").config({
    encoding: "utf8",
    path: path.join(__dirname, "../env")
});

const ejs = require("ejs");
const LRU = require("lru-cache");
ejs.cache = new LRU({
    max:200
});

const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "../views"));

app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname,"../public"), {
    cacheControl: false,
    etag: false,
    maxAge: "30d"
}));

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
});

app.use("/", require("./routes/index"));
app.use("/cadastro", require("./routes/cadastro"));

app.use((req, res, next) => {
    const err = new Error("Não encontrado");
    err.status = 404;

    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status);

    res.send("Erro " + status + " ocorrido: " + (err.message || err.toString()));
});

const server = app.listen(parseInt(process.env.PORT), process.env.IP, () => {
    console.log("Servidor executando na porta " + server.address().port);
});
