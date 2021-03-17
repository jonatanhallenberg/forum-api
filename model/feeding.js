const mongoose = require("mongoose");
const Feeding = mongoose.model(
    "feeding",
    new mongoose.Schema({
      time: Date,
      food: String,
      grams: Number,
      withWater: Boolean
    })
  );
module.exports = Feeding;