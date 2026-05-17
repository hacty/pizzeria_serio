const { Router } = require("express");

const router = Router();

const db = require("../db/sqlite");

// ========================
// PAGINA EMPLEADOS
// ========================

router.get("/", (req, res) => {

    // PROTEGER
    if (!req.session.usuario) {
        return res.redirect("/login");
    }

    db.all(
        `
        SELECT *
        FROM Empleado
        `,
        [],
        (err, empleados) => {

            if (err) {
                console.log(err);
                return res.send("Error cargando empleados");
            }

            return res.render("empleados", {
                empleados,
                usuario: req.session.usuario
            });

        }
    );
});


// ========================
// FORM CREAR EMPLEADO
// ========================

router.get("/crear", (req, res) => {

    if (!req.session.usuario) {
        return res.redirect("/login");
    }

    return res.render("crearempleado");
});


// ========================
// CREAR EMPLEADO
// ========================

router.post("/crear", (req, res) => {

    const {

        id_empleado,
        nombre,
        apellido,
        cargo,
        telefono,
        fecha_contratacion,
        password

    } = req.body;

    db.run(
        `
        INSERT INTO Empleado (
            id_empleado,
            nombre,
            apellido,
            cargo,
            telefono,
            fecha_contratacion,
            password
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
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
                return res.send("Error creando empleado");
            }

            return res.redirect("/dashboard/empleados");

        }
    );
});


// ========================
// FORM EDITAR
// ========================

router.get("/editar/:id", (req, res) => {

    const id = req.params.id;

    db.get(
        `
        SELECT *
        FROM Empleado
        WHERE id_empleado = ?
        `,
        [id],
        (err, empleado) => {

            if (err) {
                console.log(err);
                return res.send("Error cargando empleado");
            }

            return res.render("editarempleado", {
                empleado
            });

        }
    );
});


// ========================
// ACTUALIZAR EMPLEADO
// ========================

router.post("/editar/:id", (req, res) => {

    const id = req.params.id;

    const {

        nombre,
        apellido,
        cargo,
        telefono,
        fecha_contratacion,
        password

    } = req.body;

    db.run(
        `
        UPDATE Empleado
        SET
            nombre = ?,
            apellido = ?,
            cargo = ?,
            telefono = ?,
            fecha_contratacion = ?,
            password = ?
        WHERE id_empleado = ?
        `,
        [
            nombre,
            apellido,
            cargo,
            telefono,
            fecha_contratacion,
            password,
            id
        ],
        function (err) {

            if (err) {
                console.log(err);
                return res.send("Error actualizando empleado");
            }

            return res.redirect("/dashboard/empleados");

        }
    );
});


// ========================
// ELIMINAR EMPLEADO
// ========================

router.get("/eliminar/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        `
        DELETE FROM Empleado
        WHERE id_empleado = ?
        `,
        [id],
        function (err) {

            if (err) {
                console.log(err);
                return res.send("Error eliminando empleado");
            }

            return res.redirect("/dashboard/empleados");

        }
    );
});

module.exports = router;