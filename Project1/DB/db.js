const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({
  path: "../config.env",
});

const uri = process.env.database.replace("<password>", process.env.password);
mongoose
  .connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("A conexão foi feita com sucesso");
  })
  .catch((erro, data) => {
    if (erro) throw erro;
    console.log("Erro ao conectar base de dados", erro);
  });
