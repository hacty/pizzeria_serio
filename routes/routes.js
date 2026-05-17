const { Router } = require("express");

const router = Router();

// HOME
router.use("/", require("./start.routes"));

// LOGIN / SESIÓN
router.use("/login", require("./login.routes"));
router.use("/dashboard/empleados/register", require("./register.routes"));
router.use("/dashboard", require("./dashboard.routes"));
router.use("/dashboard/productos", require("./productos.routes"));
router.use("/dashboard/agregar_producto", require("./agregar_productos.routes"));
router.use("/dashboard/categorias", require("./categorias.routes"));
router.use("/dashboard/empleados", require("./empleados.routes"));

module.exports = router;