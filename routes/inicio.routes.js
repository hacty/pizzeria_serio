const { Router } = require("express");
const router = Router();

const db = require("../db/sqlite"); // 👈 IMPORTANTE

router.post("/", (req, res) => {
  const { usuario, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";

  db.get(sql, [usuario, password], (err, row) => {
    if (err) return res.send("Error");

    if (row) {
      return res.redirect("/");
    } else {
      return res.render("login", {
        error: "Usuario o contraseña incorrectos"
      });
    }
  });
});

// Mostrar página de login
router.get("/", (req, res) => {
  res.render("login"); // o "sesion" si tu vista se llama así
});

module.exports = router; 

