const express = require("express");
const morgan = require("morgan");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
const client = require("./db/index");

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));

// Main route
app.get("/", async (req, res, next) => {
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
app.get("/posts/:id", async (req, res, next) => {
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

const PORT = 1337;

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="news-list">
          <header><img src="/logo.png" />Wizard News</header>

          <div class="news-item">
            <p>Error: Resource Not Found</p>
          </div>
        </div>
      </body>
    </html>`;
  res.status(404).send(html);
});

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
