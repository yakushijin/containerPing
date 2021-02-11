const express = require("express");
const app = express();
const { Client } = require("pg");
const Log4js = require("log4js");
Log4js.configure("log-config.json");

const logger = Log4js.getLogger("system");

const port = 8080;

app.get("/", (req, res, next) => {
  res.send("ok!");
  console.log("ok!");
});

app.get("/prmdisp", (req, res, next) => {
  const pass = process.env.PASSWORD;
  res.send(pass);
});

app.get("/log", (req, res, next) => {
  res.send("log");
  logger.info("info");
  logger.error("エラー");
});

app.get("/postgres", (req, res) => {
  const dbName = "postgres";
  const dbUser = "postgresUser";
  const dbPassword = "postgresPass1234!";
  const dbHost = "postgresIPorDomain";
  const dbQuery = "SELECT * FROM hoge";

  const CC = new Client({
    database: dbName,
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: 5432,
  });
  CC.connect()
    .then(() => res.send("dbok"))
    .catch((e) => console.log(e));
});

app.listen(port, () => {});
