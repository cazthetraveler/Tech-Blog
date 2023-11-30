const router = require("express").Router();
const withAuth = require("../utils/auth");
const { BlogPost, User, Comment } = require("../models");

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

// get one blogpost :PP
// router.get("/blogposts/:id", async (req, res) => {
//   try {
//     const blogPostData = await BlogPost.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           as: "author_name"
//         }
//       ]});
//     const blogpost = blogPostData.get({plain: true});

//     res.render("blogposts", {blogpost, loggedIn: req.session.loggedIn});
//   } catch (err) {
//     res.status(500).json(err);
//   };
// });

// router.get('/blogposts/:id', async (req, res) => {
//   try {
//       const commentData = await Comment.findAll({
//           where: { id: req.params.id },
//       });
//       if (commentData.length === 0) {
//           res.status(404).json({ message: `The id ${req.params.id} has no comment.` });
//           return;
//       }
//       res.status(200).json(commentData);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

router.get("/blogposts/:id", async (req, res) => {
  try {
    const blogPostId = req.params.id;

    const blogPostData = await BlogPost.findByPk(blogPostId, {
      include: Comment,
    });

    if (!blogPostData) {
      res
        .status(404)
        .json({ message: `Blog post with id ${blogPostId} not found.` });
      return;
    }

    const comments = blogPostData.comments;

    // if (comments.length === 0) {
    //   res.status(404).json({ message: `The blog post with id ${blogPostId} has no comments.` });
    //   return;
    // }

    res.render("blogposts", {
      blogPost: blogPostData.get({ plain: true }),
      comments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error("Error retrieving comments:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
