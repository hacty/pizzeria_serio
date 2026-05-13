const { Router } = require("express");
const router = Router();

const db = require("../db/sqlite"); // 👈 IMPORTANTE

router.post("/", (req, res) => {
  const { usuario, password } = req.body;

  console.log("🟢 Nuevo registro:");
  console.log("Usuario:", usuario);
  console.log("Password:", password);

  const sql = "INSERT INTO usuarios (usuario, password) VALUES (?, ?)";

  db.run(sql, [usuario, password], function (err) {
    if (err) {
      return res.send("Error creando usuario");
    }

    res.send("Usuario creado ✔");
  });
});
// Mostrar página de login
router.get("/", (req, res) => {
  res.render("register"); // o "sesion" si tu vista se llama así
});

module.exports = router; // 👈 OBLIGATORIO