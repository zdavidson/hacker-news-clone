const router = require("express").Router();
const client = require("../db/index");
const postList = require("../views/postList");
const postDetails = require("../views/postDetails");
const addPost = require("../views/addPost");

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

// Form to create a Post
router.get("/add", (req, res) => {
  res.send(addPost());
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

// Make a new Post
router.post("/", async (req, res, next) => {
  try {
    const { name, title, content } = req.body;
    let userData = await client.query(
      `SELECT * FROM users where users.name = $1`,
      [name]
    );

    // Create new user if user doesn't exist
    if (!userData.rows.length) {
      userData = await client.query(
        `INSERT INTO users (name) VALUES ($1) RETURNING *`,
        [name]
      );
    }
    const userId = userData.rows[0].id;

    // Create post
    const postData = await client.query(
      `INSERT INTO posts (userId, title, content) VALUES ($1, $2, $3) RETURNING *`,
      [userId, title, content]
    );
    const postId = postData.rows[0].id;

    // Initialize with upvote
    await client.query(`INSERT INTO upvotes (userId, postId) VALUES ($1, $2)`, [
      userId,
      postId,
    ]);
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
