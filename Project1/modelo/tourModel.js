const mongoose = require("mongoose");

// Esta a estrutura da nossa collection
const tourSchema = new mongoose.Schema({
  nome: {
    unique: true,
    required: true,
    type: String,
  },

  duration: {
    type: Number,
    required: [true, "A tour deve ter uma duração"],
  },

  groupSize: {
    type: Number,
    required: [true, "A tour deve ter um numero de grupos limite"],
  },

  difficulty: {
    type: String,
    required: [true, "A tour deve ter um nivel de dificuldade"],
  },

  ratingAverage: {
    type: Number,
    default: 4.5,
  },

  ratingQuantity: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: true,
  },

  priceDiscount: Number,
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
  },

  startDate: [Date],
});
// O nome do modelo que é atribuído na base de dados
const tour = mongoose.model("Tour", tourSchema);

module.exports = tour;
