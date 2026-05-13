const { Router } = require("express");
const router = Router();

router.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";

  db.get(sql, [usuario, password], (err, row) => {
    if (err) return res.send("Error");

    if (row) {
      // usuario encontrado
      return res.redirect("/");
    } else {
      return res.send("Usuario o contraseña incorrectos");
    }
  });
});


// Mostrar página de login
router.get("/", (req, res) => {
  res.render("login"); // o "sesion" si tu vista se llama así
});

module.exports = router; 

