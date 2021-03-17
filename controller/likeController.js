const Thread = require("../model/category");
const Comment = require("../model/comment");

module.exports = {
  get: async (req, res) => {
    try {
      const thread = await Thread.findById(req.params.threadId).populate(
        "comments"
      );

      if (!thread) {
        res.status(404).send("Thread not found");
      } else {
        res.json(thread.comments);
      }
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  },
  post: async (req, res) => {
    const thread = await Thread.findById(req.params.categoryId);

    if (!category) {
      res.status(404).send("Category not found");
    } else {
      req.body.createdAt = new Date();
      const thread = new Thread(req.body);
      category.threads.push(thread);
      await category.save();
      await thread.save();
      res.status(201).json(thread);
    }
  },
  delete: async (req, res) => {
    const thread = await Thread.findById(req.params.threadId);
    if (!thread) {
      res.status(404).send("Thread not found");
    } else {
      const deleteResult = await Comment.findByIdAndDelete(req.params.commentId);

      if (deleteResult) {
        thread.comments = thread.comments.filter(
          (commentId) => commentId != req.params.commentId
        );
        try {
          await thread.save();
        } catch (e) {
          res.send(500).end();
          console.log(e);
        }
        res.send(200).end();
      } else {
        res.send(404).end();
      }
    }
  },
};
