const mongoose = require("mongoose");
const env = require("dotenv");

env.config({
  path: "./config.env",
});

const db = process.env.dataBase.replace("<password>", process.env.password);
// console.log(db);
console.log("connectado");

mongoose
  .connect(`${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conection) => {
    console.log("Base de dados conectada com suceeso");
  })
  .catch((err) => console.log("Erro ,", err));

const tourSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    required: [true, "O tour deve ter um nome"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "O tour deve ter um preço"],
  },
});

const tour = mongoose.model("Tour", tourSchema);
const test = new tour({
  nome: "Morango",
  price: 300,
});

// test.save().then((doc) =>
//   console.log(
//     doc.updateOne({
//       nome: "Morango",
//       price: 200,
//     })
//   )
// );
