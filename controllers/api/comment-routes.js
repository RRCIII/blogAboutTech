const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET COMMENTS
router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      include: [{ model: Post, attributes: ["title", "content"] }],
    });
    if (!dbCommentData) {
      res.status(404).json({ message: "No comments were found." });
      return;
    }
    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET SINGLE COMMENT
router.get("/:id", async (req, res) => {
    try {
      const dbCommentData = await Comment.findByPk(req.params.id, {
        include: [
          {
            model: Post,
            attributes: ["title", "content"],
          },
        ],
      });
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment was found." });
        return;
      }
      res.status(200).json(dbCommentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });