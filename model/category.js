const mongoose = require("mongoose");
const Sandbox = require('./sandbox');

const CategorySchema = new mongoose.Schema({
  name: String,
  createdAt: Date,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "thread",
    },
  ],
});

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;