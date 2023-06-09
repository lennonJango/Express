const User = require("./../modelo/userModel");

exports.checkBody = (req, res, next) => {
  if (req.body.name && req.body.password && req.body.id)
    return res.status(401).json({
      status: "Fail",
      message: "Username e password  e id requeridos ",
    });
  next();
};

exports.getAllUsers = function (req, res) {
  const user = User.find();
  res.status(200).json({
    status: "Success",
    TimeRequest: req.TimeRequest,
    data: {
      user,
    },
  });
};

exports.createNewUser = function (req, res) {
  const newId = dadosUsers[dadosUsers.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  dadosUsers.push(newUser);
  fs.writeFile(
    `${__dirname}../dev-data/data/users.json`,
    JSON.stringify(dadosUsers),
    (error) => console.log("Ficheiro nao encontrado")
  );

  res.status(201).json({
    status: "success",
    message: "Dados atualizados",
    time: req.TimeRequest,
    dados: {
      user: dadosUsers,
    },
  });
};

exports.deleteUser = function (req, res) {
  // const id = req.params.id * 1;
  // if (id < dadosUsers.length)
  //   return res.status(404).json({
  //     status: "Fail",
  //     message: "ID invalido",
  //   });

  res.status(204).json({
    status: "Success",
    message: "User apagado",
  });
};

exports.getUser = function (req, res) {
  const id = req.params.id * 1;
  const user = dadosUsers.find((user) => user.id === id);
  console.log(user);
  res.status(200).json({
    status: "Success",
    time: req.requesTime,
    user: {
      user,
    },
  });
};

exports.updateUser = function (req, res) {
  res.status(203).json({
    status: "Success",
    time: req.requesTime,
  });
};
