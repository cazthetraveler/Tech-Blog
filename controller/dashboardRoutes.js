const router = require("express").Router();
const withAuth = require("../utils/auth");
const { BlogPost, User, Comment } = require("../models");

//display blogposts specific to user on dashboard
router.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }

  BlogPost.findAll({
    where: {
      user_id: req.session.user_id,
    },
  })
    .then((blogPostData) => {
      const blogposts = blogPostData.map((blogpost) =>
        blogpost.get({ plain: true })
      );
      res.render("dashboard", { blogposts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
