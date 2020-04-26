const router = require("express").Router();
const Post = require("../models/Post");

//GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

//CREATE POST
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();

    res.json(savedPost);
  } catch (error) {
    console.log(error);
  }
});

//GET POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

//UPDATE POST
router.patch("/:id", async (req, res) => {
  await Post.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
      },
    }
  );
  const updatedPost = await Post.findById(req.params.id);
  res.json(updatedPost);
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    await Post.remove({ _id: req.params.id });
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
