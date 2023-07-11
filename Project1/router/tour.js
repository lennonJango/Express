const express = require("express");
const { error } = require("console");
const {
  CriarTour,
  deleteTour,
  getAllTours,
  atualizarTour,
  getOneTour,
  checkBody,
} = require("../controller/tourControler");
const router = express.Router();

//router.param("id", checkID, checkBody);
//Este é um modulo organizado para estrutura melhor o nosso app.

//Para definir o router de caminho especifico
//Serve como middler

router.route("/").get(getAllTours).post(CriarTour, checkBody);
// Pegado os dados com parâmetros
router.route("/:id").get(getOneTour).patch(atualizarTour).delete(deleteTour);

module.exports = router;
