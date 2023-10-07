const mongoose = require("mongoose");
const slugfiy = require("slugify");
const validator = require("validator");
// Esta a estrutura da nossa collection
const tourSchema = new mongoose.Schema(
  {
    name: {
      unique: true,
      required: true,
      type: String,
      trim: true,
      // Validators
      maxlength: [
        40,
        "O nome do tour deve ter menos ou numero igual a 40 caracteres ",
      ],
      minlength: [10, "o nome do tour deve ter mais de 10 caracteres"],
      // Customer validators
      validate: [validator.isAlpha, "Tour name deve somente ter caracteres"],
    },

    slug: {
      type: String,
    },

    secretTour: {
      type: Boolean,
      default: false,
    },

    duration: {
      type: Number,
      required: [true, "A tour deve ter uma duração"],
    },

    maxGroupSize: {
      type: Number,
      required: [true, "A tour deve ter um numero de grupos limite"],
    },

    difficulty: {
      type: String,
      required: [true, "A tour deve ter um nivel de dificuldade"],
      enum: {
        values: ["easy", "medium", "difficulty"],
        message: "Erro ao escolher o nivel de dificuladade",
      },
    },

    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "O rate minimo dever ser 1.0"],
      max: [5, "O rate maximo deve 5.0"],
    },

    ratingQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
    },

    priceDiscount: {
      type: Number,
      validate: {
        message: `O preco do desconto ({VALUE}) é maior que preco original`,
        validator: function (value) {
          // Isto nao funciona nos updates
          return value < this.price;
        },
      },
    },

    summary: {
      type: String,
      trim: true,
      required: [true, "Uma tour deve ter uma descrição"],
    },

    description: {
      type: String,
      trim: true,
    },

    imageCover: {
      type: String,
      required: [true, "Uma tour dever ter uma imagem cover"],
    },

    images: [String],

    createdAt: {
      type: Date,
      default: Date.now(),
      // Quando queremos que esse campo nao seja selecionado na query
      select: false,
    },

    startDate: {
      type: [Date],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Isto serve para obter dados que nao estao na nossa base de dados , mas nós podemos criar consoante aos dados
// Que temos
// Nao posso usar os virtual para as query porque basicamente eles nao existem
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Mongos middleware
// Este middleware ocorre antes de qualquer accao acontecer
// Neste tipo de operacao é sempre bom usar normal function por causa do seu proprio this

tourSchema.pre("save", function (next) {
  this.slug = slugfiy(this.name, {
    lower: true,
  });

  next();
});

// Pre-save

// O middleware post tem acesso a funcao next e ao documento que acabamos de salvar

// Query middleware
// Funciona antes das pesquisas serem feitas completamente

// "/^find/"-é uma funcao regular

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

// O nome do modelo que é atribuído na base de dados
const tour = mongoose.model("Tour", tourSchema);

module.exports = tour;
