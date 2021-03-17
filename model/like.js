const mongoose = require("mongoose");
const Sandbox = require("./sandbox");

const LikeSchema = new mongoose.Schema({});

const Like = mongoose.model("like", LikeSchema);
module.exports = Like;
