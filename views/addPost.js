module.exports = () => `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
      <link rel="icon" href="/logo.png" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png" /><a href="/posts">Wizard News</a>  | <a href="/posts/add">submit</a></header>
        <form method="post" action="/posts">
          <label for="name">Author</label>
          <input type="text" name="name" />
          <label for="title">Title</label>
          <input type="text" name="title" />
          <label for="content">Post</label>
          <textarea name="content"></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </body>
  </html>`;
