const { Router } = require("express");

const router = Router();

const db = require("../db/sqlite");

// PAGINA CATEGORIAS
router.get("/", (req, res) => {

    db.all(
        `SELECT * FROM Categoria`,
        [],
        (err, categorias) => {

            if(err){
                console.log(err);

                return res.send("Error");
            }

            res.render("categorias", {
                categorias
            });

        }
    );

});

// CREAR CATEGORIA
router.post("/", (req, res) => {

    const {
        id_categoria,
        nombre_categoria
    } = req.body;

    const sql = `
        INSERT INTO Categoria (
            id_categoria,
            nombre_categoria
        )
        VALUES (?, ?)
    `;

    db.run(
        sql,
        [id_categoria, nombre_categoria],
        function(err){

            if(err){
                console.log(err);

                return res.send("Error");
            }

            res.redirect("/dashboard/categorias");

        }
    );

});

module.exports = router;