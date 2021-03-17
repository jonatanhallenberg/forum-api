const mongoose = require("mongoose");
const Animal = mongoose.model(
    "animal",
    new mongoose.Schema({
      type: String,
      name: String,
      age: Number,
      color: String,
      feedings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feeding'
      }]
    })
  );
module.exports = Animal;