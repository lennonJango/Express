const express = require("express");
const router = express.Router();

// Users part
const dadosUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`, "utf-8", (erro) =>
    console.log("Ficheiro nao encontrado")
  )
);

const getAllUsers = function (req, res) {
  res.status(200).json({
    status: "Success",
    TimeRequest: req.TimeRequest,
    data: {
      users: dadosUsers,
    },
  });
};

const createNewUser = function (req, res) {
  const newId = dadosUsers[dadosUsers.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  dadosUsers.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(dadosUsers),
    (error) => console.log("Ficheiro nao encontrado")
  );

  res.status(201).json({
    status: "success",
    message: "Dados atualizados",
    time: req.TimeRequest,
    dados: {
      dadosUsers,
    },
  });
};

const deleteUser = function (req, res) {
  const id = req.params.id * 1;
  if (id < dadosUsers.length)
    return res.status(404).json({
      status: "Fail",
      message: "ID invalido",
    });

  res.status(204).json({
    status: "Success",
    message: "User apagado",
  });
};

const getUser = function (req, res) {
  const id = req.params.id * 1;
  if (id > dadosUsers.length)
    return res.status(404).json({
      status: " Fail",
      message: "ID Invalido",
    });

  const data = dadosUsers.find((data) => (data.id = id));
  res.status(200).json({
    status: "Success",
    time: req.requesTime,
    User: {
      data,
    },
  });
};

const updateUser = function (req, res) {};

userRouter.route("/").get(getAllUsers).post(createNewUser);
// Com parâmetros
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
