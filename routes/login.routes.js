const { Router } = require("express");
const router = Router();

const db = require("../db/sqlite");

// ======================
// LOGIN
// ======================

router.post("/", (req, res) => {

    const { id_empleado, password } = req.body;

    // VALIDAR CAMPOS
    if (!id_empleado || !password) {

        return res.render("login", {
            error: "Completa todos los campos"
        });

    }

    const sql = `
        SELECT * FROM Empleado
        WHERE id_empleado = ? AND password = ?
    `;

    db.get(sql, [id_empleado, password], (err, row) => {

        // ERROR SQLITE
        if (err) {

            console.log(err);

            return res.send("Error en la base de datos");

        }

        // LOGIN CORRECTO
        if (row) {

            // GUARDAR SESION
            req.session.usuario = row.id_empleado;

            // REDIRECCIONAR
            return res.redirect("/dashboard");

        }

        // LOGIN INCORRECTO
        return res.render("login", {
            error: "Usuario o contraseña incorrectos"
        });

    });

});

// ======================
// MOSTRAR LOGIN
// ======================

router.get("/", (req, res) => {

    // SI YA ESTA LOGUEADO
    if (req.session.usuario) {
        return res.redirect("/dashboard");
    }

    res.render("login");

});

module.exports = router;