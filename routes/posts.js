const router = require("express").Router();
const client = require("../db/index");
const postList = require("../views/postList");
const postDetails = require("../views/postDetails");

// Main route
router.get("/", async (req, res, next) => {
  try {
    const data = await client.query(
      "SELECT posts.*, users.name, counting.upvotes FROM posts INNER JOIN users ON users.id = posts.userId LEFT JOIN (SELECT postId, COUNT(*) as upvotes FROM upvotes GROUP BY postId) AS counting ON posts.id = counting.postId\n"
    );
    const posts = data.rows;
    res.send(postList(posts));
  } catch (error) {
    next(error);
  }
});

// Single Post route
router.get("/:id", async (req, res, next) => {
  try {
    const data = await client.query(
      "SELECT posts.*, users.name FROM posts INNER JOIN users on users.id = posts.userId\n WHERE posts.id = $1",
      [req.params.id]
    );
    const post = data.rows[0];
    res.send(postDetails(post));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
