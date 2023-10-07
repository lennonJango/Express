/* eslint-disable no-constant-condition */
const express = require("express");
const morgan = require("morgan");
const userRouter = require(`./router/users`);
const tourRouter = require(`./router/tour`);
const dotenv = require("dotenv");
const AppError = require("./features/AppError");
const erroHaldling = require("./controller/errorController");
// Serve para aceder as variáveis ambiente
dotenv.config({
  path: "./config.env",
});

// Como criar multiple router
const app = express();
// Middler
app.use(express.json());
if (process.env.NODE_ENV == "Development") {
  //Middler de terceiros
  app.use(morgan("dev"));
}

//Middler para ficheiros estáticos
//Responsável pelos ficheiros estáticos como paginas web,imagens,videos
app.use(express.static(`${__dirname}/static-files`));
app.use(express.static(`${__dirname}/public`));

// My onw midlear
app.use((req, res, next) => {
  console.log("Hello from middlware");

  next();
});

//Routes
// As routas da minha API
app.use("/api/tours/v1", tourRouter);
app.use("/api/users/v1", userRouter);

// Erro para as routas (ERRO ROUTE HAdling)
app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

// Especificado quatro args na funcao o express ira saber que é um midllware function erro
app.use(erroHaldling);

module.exports = app;
