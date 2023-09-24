const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth.js");

// GET USERS
router.get("/", async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    if (!dbUserData || dbUserData.length === 0) {
      res.status(404).json({ message: "No users found." });
      return;
    }
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});