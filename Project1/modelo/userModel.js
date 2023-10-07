const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    nome: {
      unique: true,
      trim: true,
      type: String,
      required: [true, "O nome do usuário é obrigatório"],
    },

    email: {
      unique: true,
      type: String,
      trim: true,
      required: [true, "O email do usuário é obrigatório"],
      lowercase: true,
      validate: [validator.isEmail, "Deve ser um email valido"],
    },

    photo: {
      type: String,
    },

    password: {
      type: String,
      required: [true, "A palavra passe do usuário é obrigatória"],
      minlength: [8, "A palavra passe no minimo deve ter 8 caracteres"],
    },

    passwordConfirm: {
      type: String,
      required: [true, "A palavra passe de confirmacao é obrigatoria"],
      minlength: [8, "A palavra passe no minimo deve ter 8 caracteres"],
      validator: {
        // Isto so funciona quando tentamos salvar
        function(el) {
          return el === this.password;
        },
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = new mongoose.model("User", UserSchema);

module.exports = User;
