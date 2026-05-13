const { Router } = require("express");
const router = Router();

const db = require("../sqlite.js"); // 👈 IMPORTANTE

router.post("/register", (req, res) => {
  const { usuario, password } = req.body;

  const sql = "INSERT INTO usuarios (usuario, password) VALUES (?, ?)";

  db.run(sql, [usuario, password], function (err) {
    if (err) {
      return res.send("Error creando usuario");
    }

    res.send("Usuario creado ✔");
  });
});

module.exports = router; // 👈 OBLIGATORIO