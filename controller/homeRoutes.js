const router = require("express").Router();
const withAuth = require("../utils/auth");
const { BlogPost, User } = require("../models");

//get all blog posts
router.get("/", async (req, res) => {
  const blogPostData = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: "author_name",
      },
    ],
  }).catch((err) => {
    res.json(err);
  });
  const blogposts = blogPostData.map((blogpost) =>
    blogpost.get({ plain: true })
  );
  res.render("homepage", { blogposts, loggedIn: req.session.loggedIn });
});

//get login/register page, redirect if logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//get dashboard page, redirect if not logged in
router.get("/dashboard", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }

  res.render("dashboard", { loggedIn: req.session.loggedIn });
});

//get one blogpost :PP
router.get("/blogposts/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "author_name",
        },
      ],
    });
    const blogpost = blogPostData.get({ plain: true });

    res.render("blogposts", { blogpost, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all comments on a blogpost
router.get("/blogposts/:id", async (req, res) => {
  const commentData = await Comment.findByPk({
    include: [
      {
        model: BlogPost,
        as: "blogpost_id", //idk??
      },
    ],
  }).catch((err) => {
    res.json(err);
  });
  const comments = commentData.map((comment) => comment.get({ plain: true }));
  res.render("blogposts", { comments, loggedIn: req.session.loggedIn });
});

module.exports = router;
