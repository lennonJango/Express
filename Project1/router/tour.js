const fs = require("fs");
const express = require("express");
const { error } = require("console");
const {
  atualizarTour,
  criarTour,
  deleteTour,
  getAllTours,
  getOneTour,
  checkID,
  checkBody,
} = require("../controller/tourControler");
const router = express.Router();

router.param("id", checkID, checkBody);
//Este é um modulo organizado para estrutura melhor o nosso app.

//Para definir o router de caminho especifico
//Serve como middler

router.route("/").get(getAllTours).post(atualizarTour);
// Pegado os dados com parâmetros
router.route("/:id").get(getOneTour).patch(criarTour).delete(deleteTour);

module.exports = router;
