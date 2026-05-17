const { Router } = require("express");
const router = Router();

const db = require("../db/sqlite");

// HOME PRINCIPAL
router.get("/", (req, res) => {

    db.all(
        `SELECT * FROM Producto`,
        [],
        (err, productos) => {

            if(err){

                console.log(err);

                return res.send("Error cargando home");

            }

            return res.render("home", {
                productos
            });

        }
    );

});

module.exports = router;