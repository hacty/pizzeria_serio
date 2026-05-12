const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.use("/", require('./dash.routes'));

module.exports = router;