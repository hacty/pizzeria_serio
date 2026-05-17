const { Router } = require("express");

const router = Router();

// DASHBOARD
router.get("/", (req, res) => {

    // SI NO HAY SESION
    if (!req.session.usuario) {
        return res.redirect("/login");
    }

    // MOSTRAR DASHBOARD
    res.render("dashboard", {
        usuario: req.session.usuario
    });

});

module.exports = router;