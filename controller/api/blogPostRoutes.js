const router = require("express").Router();
const { BlogPost } = require("../../models");

//create a blogpost

router.post("/", async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      posted_date: new Date(),
      user_id: req.session.user_id,
    });
    console.log("this is the post", newBlogPost);
    res.status(200).json(newBlogPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//edit a blogpost

router.put("/:id", async (req, res) => {
  try {
    const updateBlogPost = await BlogPost.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateBlogPost);
  } catch (err) {
    req.status(500).json(err);
  }
});

//delete a blogpost

router.delete("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (blogPostData === 0) {
      return res.status(404).json({ message: "Blog Post not found!" });
    }
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
