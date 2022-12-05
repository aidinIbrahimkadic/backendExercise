const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "backend_db",
});

db.connect();

const getPostsController = (req, res) => {
  const sql =
    "SELECT blog_post_id, slug, title, description, body, createdAt, updatedAt, t.tag_name FROM blog_posts b JOIN tag_post tp ON b.blog_post_id = tp.blog_post JOIN tags t ON t.tag_id = tp.tags ORDER BY createdAt DESC";

  const getTags =
    "SELECT t.tag_name FROM blog_posts b JOIN tag_post tp ON b.blog_post_id = tp.blog_post JOIN tags t ON t.tag_id = tp.tags WHERE blog_post_id = ?";

  db.query(sql, (err, resPosts) => {
    if (err) throw err;

    res.setHeader("content-type", "application/json");

    let id = 0;
    const allPosts = [];

    // const rez = await sqlQuery(getTags, [1]);
    const tagsArr = [];
    // rez.forEach((r) => {
    //   tagsArr.push(r.tag_name);
    // });

    resPosts.forEach((post) => {
      if (id === post.blog_post_id) {
        console.log("test");
      } else {
        id = post.blog_post_id;

        allPosts.push({
          slug: post.slug,
          title: post.title,
          description: post.description,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          tags: tagsArr,
        });
      }
    });
    res.send(JSON.stringify(allPosts));
    console.log(allPosts);
  });
};

sqlQuery = (sql, data) => {
  return new Promise((resolve, reject) => {
    db.query(sql, data, (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

module.exports = getPostsController;
