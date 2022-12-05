const express = require("express");
const router = express.Router();

router.get("/posts", require("../controllers/getPostsController"));

module.exports = router;
