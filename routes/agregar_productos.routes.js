const { Router } = require("express");

const router = Router();

const db = require("../db/sqlite");

// =========================
// MOSTRAR FORMULARIO
// =========================

router.get("/", (req, res) => {

    // PROTEGER
    if(!req.session.usuario){
        return res.redirect("/login");
    }

    // CARGAR CATEGORIAS
    db.all(
        `SELECT * FROM Categoria`,
        [],
        (err, categorias) => {

            if(err){

                console.log(err);

                return res.send("Error");

            }

            return res.render("agregarproducto", {
                categorias
            });

        }
    );

});

// =========================
// GUARDAR PRODUCTO
// =========================

router.post("/", (req, res) => {

    const {
        id_producto,
        nombre_producto,
        descripcion,
        precio,
        imagen,
        id_categoria
    } = req.body;

    const sql = `
        INSERT INTO Producto (

            id_producto,

            nombre_producto,

            descripcion,

            precio,

            imagen,

            id_categoria

        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            id_producto,
            nombre_producto,
            descripcion,
            precio,
            imagen,
            id_categoria
        ],
        function(err){

            if(err){

                console.log(err);

                return res.send("Error creando producto");

            }

            return res.redirect("/dashboard/productos");

        }
    );

});

module.exports = router;