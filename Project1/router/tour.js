const express = require("express");
const router = express.Router();

//Este é um modulo organizado para estrutura melhor o nosso app.

const getAllTours = function (req, res) {
  res.status(200).json({
    status: "Success",
    time: req.requesTime,
    data: {
      tours,
    },
  });
};

const atualizarTour = function (req, res) {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tour.json`,
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

const getOneTour = function (req, res) {
  const id = Number(req.params.id);
  if (id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Id Invalido",
    });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(201).json({
    status: "Success",
    data: {
      tour,
    },
  });
};

const criarTour = function (req, res) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Parâmetro invalido",
    });
  }

  res.status(201).json({
    status: "Success",
    message: "Dados Atualizados",
    data: {
      tour: tours[req.params.id * 1],
    },
  });
};

const deleteTour = function (req, res) {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "ID invalido",
    });
  }

  res.status(204).json({
    status: "Success",
    message: "Ficheiro Apagado com sucesso",
    data: null,
  });
};

//Para definir o router de caminho especifico
//Serve como middler

router.route("/").get(getAllTours).post(atualizarTour);
// Pegado os dados com parâmetros
router.route("/:id").get(getOneTour).patch(criarTour).delete(deleteTour);

module.exports = router;
