const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const { error } = require("console");

const app = express();

const port = 8000;
// Middler
app.use(express.json());

//Middler de terceiros
app.use(morgan("dev"));
// My onw midlear
app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});
// my other middler
app.use((req, res, next) => {
  console.log("Hello from middler");
  next();
  a;
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tour.json`)
);




// //Traz todos dados
// app.get("/api/tours/v1", getAllTours)
// //Atualiza os dados
// app.post("/api/tours/v1", atualizarTour)
// //Respondendo com parâmetros
// app.get("/api/tours/v1/:id", getOneTour)
// // Patch
// app.patch("/api/tours/v1/:id", criarTour);
// //Delete method
// app.delete("/api/tours/v1/:id", deleteTour);
// Forma Melhorada

// Como criar multiple router


//Para definir o router de caminho especifico
//Serve como middler

tourRouter.route("/").get(getAllTours).post(atualizarTour);
// Pegado os dados com parâmetros
tourRouter.route("/:id").get(getOneTour).patch(criarTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createNewUser);
// Com parâmetros
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
//Routes
app.use("/api/tours/v1", tourRouter);
app.use("/api/users/v1", userRouter);

app.listen(port, () => {
  console.log(`Servidor is running on port ${port}`);
});
