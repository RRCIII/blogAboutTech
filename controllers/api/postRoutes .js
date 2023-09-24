const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// GET POSTS
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    if (!dbPostData) {
      res.status(404).json({ message: 'No posts were found.' });
      return;
    }
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT ~ UPDATE POST
router.put('/:id', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.update(req.body, {
        where: { id: req.params.id },
      });
      if (dbPostData[0] === 0) {
        res.status(404).json({ message: 'No post was found to update.' });
        return;
      }
      res.status(200).json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  