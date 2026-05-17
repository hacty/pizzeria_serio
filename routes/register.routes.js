const { Router } = require("express");
const router = Router();

const db = require("../db/sqlite");

// REGISTRO
router.post("/", (req, res) => {

  const { id_empleado, password } = req.body;

  console.log("🟢 Nuevo registro:");
  console.log("ID:", id_empleado);

  // VALIDAR CAMPOS
  if (!id_empleado || !password) {
    return res.send("Completa todos los campos");
  }

  // INSERTAR
  const sql = `
    INSERT INTO Empleado 
    (id_empleado, password) 
    VALUES (?, ?)
  `;

  db.run(sql, [id_empleado, password], function (err) {

    if (err) {

      console.log(err);

      // ID REPETIDO
      if (err.message.includes("UNIQUE")) {
        return res.send("Ese empleado ya existe");
      }

      return res.send("Error creando usuario");
    }

    res.send("Usuario creado ✔");

  });

});

// MOSTRAR REGISTER
router.get("/", (req, res) => {
  res.render("register");
});

module.exports = router;