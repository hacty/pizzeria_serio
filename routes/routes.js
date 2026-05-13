const { Router } = require("express");

const router = Router();

// HOME
router.use("/", require("./dash.routes"));

// LOGIN / SESIÓN
router.use("/login", require("./inicio.routes"));
router.use("/register", require("./register.routes"));

module.exports = router;