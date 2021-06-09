const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use("/posts", require("./routes/posts"));

app.get("/", (req, res) => {
  res.redirect("/posts");
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
