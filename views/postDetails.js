module.exports = (post) => `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
      <link rel="icon" href="/logo.png" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png" /><a href="/posts">Wizard News</a>  | <a href="/posts/add">submit</a></header>

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
