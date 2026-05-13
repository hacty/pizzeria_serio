const { Router } = require("express");
const router = Router();

// HOME PRINCIPAL
router.get("/", (req, res) => {
  res.render("home"); // o "dashboard" si así lo llamas en views
});

module.exports = router;