const { Router } = require("express");

const router = Router();

router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

router.get("/menu", (req, res) => {
    res.render("menu");
});

module.exports = router;