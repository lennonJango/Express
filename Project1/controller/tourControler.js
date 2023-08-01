const { query } = require("express");
const tour = require("../modelo/tourModel");
const ApiFeatures = require("../features/API_features.JS");

exports.checkBody = (req, res, next) => {
  if (req.body.name && req.body.price)
    return res.status(401).json({
      status: "Fail",
      message: "Faltam o nome do produto e o preço",
    });
  next();
};

// Para obter os 5 melhores tours
// O uso de midleware
exports.get_5_best_tours = (req, res, next) => {
  req.query.sort = "-price, ratingAverage";
  req.query.limit = 5;

  next();
};

// Para obter os mais baratos

exports.get_5_cheap_tours = (req, res, next) => {
  req.query.sort = "price";
  req.query.limit = 5;
  next();
};

exports.getAllTours = async function (req, res) {
  try {
    const filter = new ApiFeatures(tour.find(), req.query)
      .filter()
      .sorting()
      .fields()
      .pagination();

    const Tours = await filter.query;

    // Mandado a resposta
    res.status(200).json({
      status: "Sucesso",
      numerosDeTours: Tours.length,
      dados: {
        Tours,
      },
    });
  } catch (erro) {
    res.status(404).json({
      message: "Dados nao encontrados",
    });
  }
};

exports.CriarTour = async function (req, res) {
  try {
    // Esta função do moongose cria um novo tour consoante aos dados que sao submetidos no body
    const newTour = await tour.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Novo Tour criando",
      data: Date.now(),
      dados: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: `Motivo do erro : ${err}`,
    });
  }
};

exports.getOneTour = async function (req, res) {
  try {
    // Esta função do moongose  faz uma pequisa na base de dados consoante ao id  que é passado no paramento da url
    const OneTour = await tour.findById(req.params.id);

    res.status(200).json({
      status: "Success",
      data: {
        OneTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: "Tour não encontrado",
      erroMessage: `Motivo do erro ${err} `,
    });
  }
};

exports.atualizarTour = async function (req, res) {
  try {
    // Esta função moongose atualiza os dados consoante ao id que é passado no paramento da URI
    const updatedTour = await tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "Success",
      message: "Dados Atualizados",
      data: {
        updatedTour,
      },
    });
  } catch (err) {
    res.status(204).json({
      status: "Fail",
      message: "Id invalido",
      erroMessage: `Motivo do erro ${err}`,
    });
  }
};

exports.deleteTour = async function (req, res) {
  try {
    const deletedTour = await tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      message: "Ficheiro Apagado com sucesso",
      data: null,
    });
  } catch {
    res.status(402).json({
      status: "Fail",
      message: "ID invalido",
      messageErro: `Motivo do erro ${Error}`,
    });
  }
};
