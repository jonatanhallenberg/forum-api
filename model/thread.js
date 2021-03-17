const mongoose = require("mongoose");
const Thread = mongoose.model(
  "thread",
  new mongoose.Schema({
    title: String,
    content: String,
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  })
);
module.exports = Thread;
