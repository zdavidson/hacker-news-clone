const html = require("html-template-tag");
const postBank = require("../postBank");

module.exports = (post) => html`<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png" />Wizard News</header>

        <div class="news-item">
          <p>
            <span class="news-position"></span>${post.title}<small>
              (by ${post.name})</small
            >
          </p>
          <p>${post.content}</p>
        </div>
      </div>
    </body>
  </html>`;
