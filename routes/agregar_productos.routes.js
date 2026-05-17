const { Router } = require("express");

const router = Router();

const db = require("../db/sqlite");

const multer = require("multer");

const path = require("path");

// CONFIG IMAGENES

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

router.post("/", upload.single("imagen"), (req, res) => {


    const {
        id_producto,
        nombre_producto,
        descripcion,
        precio,
        id_categoria
    } = req.body;

    const imagen = "/images/" + req.file.filename;


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