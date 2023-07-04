/* eslint-disable no-constant-condition */
const express = require("express");
const morgan = require("morgan");
const userRouter = require(`./router/users`);
const tourRouter = require(`./router/tour`);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Serve para aceder as variáveis ambiente
dotenv.config({
  path: "./config.env",
});

// Como criar multiple router
const app = express();
// Middler
app.use(express.json());
if ((process.env.NODE_ENV = "Development")) {
  //Middler de terceiros
  app.use(morgan("dev"));
}
// Connectado ao database
// const db = process.env.database.replace("<password>", process.env.password);


//Middler para ficheiros estáticos 
app.use(express.static(`${__dirname}/static-files`));
app.use(express.static(`${__dirname}/public`));
// My onw midlear
app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});

// my other middler
app.use((req, res, next) => {
  console.log("Hello from middler");
  next();
});

//Routes
app.use("/api/tours/v1", tourRouter);
app.use("/api/users/v1", userRouter);

app.listen(process.env.porta, () => {
  console.log(`Servidor is running on port ${process.env.PORTA}`);
});




