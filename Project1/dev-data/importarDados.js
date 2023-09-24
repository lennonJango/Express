// Este ficheiro serve para manipular dados podendo importalos do ficheiro json ou de um outro ficheiro
const app = require("./../app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const tour = require("./../modelo/tourModel");
dotenv.config({
  path: "./../config.env",
});

const uri = process.env.database.replace("<password>", process.env.password);

const db = mongoose
  .connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("A conexão foi feita com sucesso");
  })
  .catch((erro) => {
    if (erro) throw erro;
    console.log("Erro ao conectar base de dados", erro);
  });

app.listen(process.env.porta, () => {
  console.log(`Servidor is running on port ${process.env.PORTA}`);
});

//Para importar dados

const file = JSON.parse(fs.readFileSync(`./data/tour-simple.json`, "utf-8"));
console.log(file);

const importData = async () => {
  try {
    await tour.insertMany(file);
    console.log("Dados salvos");
  } catch (erro) {
    console.log(erro);
  }
};

const deleteAll = async () => {
  try {
    await tour.deleteMany();
    console.log("dados apagdos");
  } catch (erro) {
    console.log(erro);
  }
};

 importData();
//deleteAll();
