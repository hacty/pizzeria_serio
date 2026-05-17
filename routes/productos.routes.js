const { Router } = require("express");

const router = Router();

const db = require("../db/sqlite");

// ========================
// PAGINA PRODUCTOS
// ========================

router.get("/", (req, res) => {

    db.all(
        `
        SELECT

            Producto.*,

            Categoria.nombre_categoria

        FROM Producto

        LEFT JOIN Categoria
        ON Producto.id_categoria = Categoria.id_categoria
        `,
        [],
        (err, productos) => {

            if(err){

                console.log(err);

                return res.send("Error cargando productos");

            }

            return res.render("productos", {
                productos,
                usuario: req.session.usuario
            });

        }
    );

});

// ========================
// AGOTAR PRODUCTO
// ========================

router.get("/agotado/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        `
        UPDATE Producto

        SET agotado = 1

        WHERE id_producto = ?
        `,
        [id],
        function(err){

            if(err){

                console.log(err);

                return res.send("Error agotando producto");

            }

            return res.redirect("/dashboard/productos");

        }
    );

});

// ========================
// ACTIVAR PRODUCTO
// ========================

router.get("/activar/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        `
        UPDATE Producto

        SET agotado = 0

        WHERE id_producto = ?
        `,
        [id],
        function(err){

            if(err){

                console.log(err);

                return res.send("Error activando producto");

            }

            return res.redirect("/dashboard/productos");

        }
    );

});

// ========================
// ELIMINAR PRODUCTO
// ========================

router.get("/eliminar/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        `
        DELETE FROM Producto

        WHERE id_producto = ?
        `,
        [id],
        function(err){

            if(err){

                console.log(err);

                return res.send("Error eliminando producto");

            }

            return res.redirect("/dashboard/productos");

        }
    );

});

module.exports = router;