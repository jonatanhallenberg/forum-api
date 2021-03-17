const mongoose = require("mongoose");
const Thread = mongoose.model(
  "thread",
  new mongoose.Schema({
    title: String,
    content: String,
    createdAt: Date,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "like",
      },
    ],
  })
);
module.exports = Thread;
