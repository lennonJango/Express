const User = require("../modelo/userModel");
const catchAsyncErro = require("../features/AppErrosAsync");
const AppError = require("../controller/errorController");

exports.checkBody = (req, res, next) => {
  if (req.body.name && req.body.password && req.body.id)
    return res.status(401).json({
      status: "Fail",
      message: "Username e password  e id requeridos ",
    });
  next();
};

exports.getAllUsers = catchAsyncErro(async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    return next(new AppError("Nenhum user foi encontrado", 404));
  }

  res.status(200).json({
    Mensagem: "Sucesso",
    Tamanho: user.length,
    Dados: user,
  });
});

exports.createNewUser = catchAsyncErro(async (req, res) => {
  await User.create(req.body);

  res.status(201).json({
    Staus: "Sucess",
    message: "User criado com sucesso",
  });
});

exports.deleteUser = catchAsyncErro(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new AppError(
        "Nao foi possivel apagar o user porque nenhum user foi encontrado",
        404
      )
    );
  }

  res.status(204).json({
    status: "Success",
    message: "User apagado",
  });
});

exports.getUser = catchAsyncErro(async (req, res, next) => {
  const oneUser = await User.findById(req.params.id);

  console.log(oneUser);

  if (!oneUser) {
    return next(
      new AppError(
        "Nenhum user foi encontrado com esse Id,tente novamente",
        400
      )
    );
  }

  res.status(200).json({
    status: "Success",
    time: req.requesTime,
    user: {
      oneUser,
    },
  });
});

exports.updateUser = catchAsyncErro(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user)
    return next(
      new AppError(
        "Nao conseguimos achar nenhum user com esse ID,tente novamente",
        404
      )
    );

  res.status(204).json({
    status: "Success",
    time: req.requesTime,
  });
});
