const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
const html = require("html-template-tag");

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));

// Main route
app.get("/", (req, res) => {
  res.send(postList);
});

// Singe Post route
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    throw new Error("Not Found");
  } else {
    res.send(postDetails(post));
  }
});

const PORT = 1337;

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const html = html`<!DOCTYPE html>
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
