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

// GET SINGLE USER
router.get("/:id", async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        attributes: { exclude: ["password"] },
        where: {
          id: req.params.id,
        },
        include: [
          { model: Post },
          {
            model: Comment,
            include: {
              model: Post,
              attributes: ["id", "title"],
            },
          },
        ],
      });
      if (!dbUserData) {
        res.status(404).json("No user was found.");
        return;
      }
      res.status(200).json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // POST ~ CREATE NEW USER
router.post("/", withAuth, async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const dbUserData = await User.create({
        username,
        email,
        password,
      });
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.status(201).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });