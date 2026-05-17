const { Router } = require("express");

const router = Router();

const db = require("../db/sqlite");

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "public/images");

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    }

});

const upload = multer({
    storage
});

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

// ========================
// FORM EDITAR
// ========================

router.get("/editar/:id", (req, res) => {

    const id = req.params.id;

    // PRODUCTO
    db.get(
        `
        SELECT * FROM Producto
        WHERE id_producto = ?
        `,
        [id],
        (err, producto) => {

            if(err){

                console.log(err);

                return res.send("Error cargando producto");

            }

            // CATEGORIAS
            db.all(
                `
                SELECT * FROM Categoria
                `,
                [],
                (err, categorias) => {

                    if(err){

                        console.log(err);

                        return res.send("Error categorias");

                    }

                    return res.render("editarproducto", {

                        producto,

                        categorias

                    });

                }
            );

        }
    );

});
// ========================
// ACTUALIZAR PRODUCTO
// ========================

router.post("/editar/:id", upload.single("imagen"), (req, res) => {

    const id = req.params.id;

    const {

        nombre_producto,

        descripcion,

        precio,

        id_categoria

    } = req.body;

    let imagen;

// SI SUBIO NUEVA IMAGEN
if(req.file){

    imagen = "/images/" + req.file.filename;

}else{

    imagen = req.body.imagen_actual;

}

    db.run(
        `
        UPDATE Producto

        SET

            nombre_producto = ?,

            descripcion = ?,

            precio = ?,

            imagen = ?,

            id_categoria = ?

        WHERE id_producto = ?
        `,
        [

            nombre_producto,

            descripcion,

            precio,

            imagen,

            id_categoria,

            id

        ],
        function(err){

            if(err){

                console.log(err);

                return res.send("Error actualizando");

            }

            return res.redirect("/dashboard/productos");

        }
    );

});

module.exports = router;