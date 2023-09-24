const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome do usuário é obrigatório"],
  },

  email: {
    type: String,
    required: [true, "O email do usuário é obrigatório"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "A palavra passe do usuário é obrigatória"],
  },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;

