const router = require("express").Router();
const { Comment } = require("../../models");

//create a blogpost

router.post("/comments", async (req, res) => {
  try {
    const newBlogPost = await Comment.create({
      content: req.body.content,
      posted_date: new Date(),
      user_id: req.session.user_id,
      blog_id: req.params.blog_id,
    });
    console.log("this is the comment", newBlogPost);
    res.status(200).json(newBlogPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
