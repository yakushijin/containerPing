const express = require("express");
const app = express();
const { Client } = require("pg");
const mysql = require("mysql");
const redis = require("redis");
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

app.get("/mysql", (req, res) => {
  const dbName = "mysql";
  const dbUser = "mysqlUser";
  const dbPassword = "mysqlPass1234!";
  const dbHost = "mysqlIPorDomain";
  const dbQuery = "SELECT * FROM hoge";

  const connection = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
  });
  connection.connect((err) => {
    if (err) {
      res.send("ng");
      return;
    }
    res.send("ok");
  });
});

app.get("/redis", (req, res) => {
  const Host = "redisIPorDomain";

  const client = redis.createClient(6379, Host);
  client.on("monitor", function (time, args, rawReply) {
    res.send("ok");
  });
});

app.listen(port, () => {});
