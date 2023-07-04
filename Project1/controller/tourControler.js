const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tour.json`, (error) =>
    console.log(error)
  )
);

exports.checkID = (req, res, next, value) => {
  if (value > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "ID invalido",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (req.body.name && req.body.price) return res.status(401).json({
    status: "Fail",
    message:"Faltam o nome do produto e o preço"
  })
  next();
}

exports.getAllTours = function (req, res) {
  res.status(200).json({
    status: "Success",
    time: req.requesTime,
    data: {
      tours,
    },
  });
};

exports.atualizarTour = function (req, res) {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}../dev-data/data/tour.json`,
    JSON.stringify(tours),
    (err) => RangeError(err)
  );
  res.status(201).json({
    status: "Success",
    message: "File atualizado",
    data: Date.now(),
    lengthFile: tours.length,
    dados: tours,
  });
};

exports.getOneTour = function (req, res) {
  const id = Number(req.params.id);
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: "Fail",
  //     message: "Id Invalido",
  //   });
  // }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
};

exports.criarTour = function (req, res) {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: "Fail",
  //     message: "Parâmetro invalido",
  //   });
  // }

  res.status(201).json({
    status: "Success",
    message: "Dados Atualizados",
    data: {
      tour: tours[req.params.id * 1],
    },
  });
};

exports.deleteTour = function (req, res) {
  res.status(204).json({
    status: "Success",
    message: "Ficheiro Apagado com sucesso",
    data: null,
  });
};
