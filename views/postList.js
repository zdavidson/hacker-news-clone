const timeAgo = require("node-time-ago");

module.exports = (posts) => `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
      <link rel="icon" href="/logo.png" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png" /><a href="/posts">Wizard News</a>  | <a href="/posts/add">submit</a></header>
        ${posts
          .map(
            (post) => `
          <div class="news-item">
            <p>
              <span class="news-position">${post.id}. ▲</span><a href="/posts/${
              post.id
            }">${post.title}</a><small> (by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${timeAgo(post.date)}
            </small>
          </div>`
          )
          .join("")}
      </div>
    </body>
  </html>`;
