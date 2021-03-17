const { restart } = require("nodemon");
const Category = require("../model/category");
const Sandbox = require("../model/sandbox");

const sandboxController = require("./sandboxController");

module.exports = {
  get: async (req, res) => {
    const sandbox = await Sandbox.findById(req.sandbox.id).populate(
      "categories"
    );
    res.json(sandbox.categories);
  },
  post: async (req, res) => {
    const category = new Category(req.body);
    req.sandbox.categories.push(category);
    try {
      await req.sandbox.save();
      await category.save();
    } catch (e) {
      console.log(e);
      res.send(500).end();
    }
    res.status(201).json(category);
  },
  delete: async (req, res) => {
    const deleteResult = await Category.findByIdAndDelete(
      req.params.categoryId
    );

    if (deleteResult) {
      req.sandbox.categories = req.sandbox.categories.filter(
        (categoryId) => categoryId != req.params.categoryId
      );
      try {
        await req.sandbox.save();
      } catch (e) {
        res.send(500).end();
        console.log(e);
      }
      res.send(200).end();
    } else {
      res.send(404).end();
    }
  },
};
