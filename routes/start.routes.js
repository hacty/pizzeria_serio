const { Router } = require("express");

const router = Router();

const db = require("../db/sqlite");

// HOME PRINCIPAL
router.get("/", (req, res) => {

    // CARGAR CATEGORIAS
    db.all(
        `SELECT * FROM Categoria`,
        [],
        (err, categorias) => {

            if(err){

                console.log(err);

                return res.send("Error categorias");

            }

            // CARGAR PRODUCTOS
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

                        return res.send("Error productos");

                    }

                    return res.render("home", {

                        categorias,

                        productos

                    });

                }
            );

        }
    );

});

module.exports = router;