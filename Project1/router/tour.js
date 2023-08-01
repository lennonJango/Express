const express = require("express");
const {
  CriarTour,
  deleteTour,
  getAllTours,
  atualizarTour,
  getOneTour,
  checkBody,
  get_5_best_tours,
  get_5_cheap_tours,
} = require("../controller/tourControler");
const router = express.Router();

//router.param("id", checkID, checkBody);
//Este é um modulo organizado para estrutura melhor o nosso app.

//Para definir o router de caminho especifico
//Serve como middler

router.route("/cheap-tours").get(get_5_cheap_tours, getAllTours);
router.route("/best-5-cheaps-tours").get(get_5_best_tours, getAllTours);

router.route("/").get(getAllTours).post(CriarTour, checkBody);
// Pegado os dados com parâmetros
router.route("/:id").get(getOneTour).patch(atualizarTour).delete(deleteTour);

module.exports = router;
