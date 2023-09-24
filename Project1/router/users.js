const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createNewUser,
  getUser,
  deleteUser,
  updateUser,
  checkID,
  checkBody,
} = require("../controller/userControler");

router.param("id", checkBody, checkID);
// Este tipo de middleware so funciona em parâmetros específicos

// Users part
  
router.route("/").get(getAllUsers).post(createNewUser);
// Com parâmetros
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
