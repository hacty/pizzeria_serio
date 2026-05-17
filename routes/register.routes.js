const { Router } = require("express");
const router = Router();

const db = require("../db/sqlite");

// REGISTRO
router.post("/", (req, res) => {

  if (!req.session.usuario) {
    return res.redirect("/login");
  }

  const {
    id_empleado,
    nombre,
    apellido,
    cargo,
    telefono,
    fecha_contratacion,
    password
  } = req.body;

  console.log("🟢 Nuevo registro:");
  console.log(req.body);

  if (
    !id_empleado ||
    !nombre ||
    !apellido ||
    !cargo ||
    !telefono ||
    !fecha_contratacion ||
    !password
  ) {
    return res.send("Completa todos los campos");
  }

  const sql = `
    INSERT INTO Empleado 
    (id_empleado, nombre, apellido, cargo, telefono, fecha_contratacion, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      id_empleado,
      nombre,
      apellido,
      cargo,
      telefono,
      fecha_contratacion,
      password
    ],
    function (err) {

      if (err) {
        console.log(err);

        if (err.message.includes("UNIQUE")) {
          return res.send("Ese empleado ya existe");
        }

        return res.send("Error creando usuario");
      }

      res.send("Empleado creado ✔");

    }
  );

});
// MOSTRAR REGISTER
router.get("/", (req, res) => {
  res.render("register");
});

module.exports = router;