const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const path = require("path");

const app = express();


app
  .set("port", process.env.PORT || 3000)

  // Archivos públicos
  .use(express.static(path.join(__dirname, "../public")))

  // Leer formularios
  .use(express.urlencoded({ extended: true }))

  // Sesiones
  .use(
    session({
      secret: "dashboardfeliz",
      resave: false,
      saveUninitialized: false,
    })
  )

  // Carpeta views
  .set("views", path.join(__dirname, "../views"))

  // Handlebars
  .set("view engine", ".hbs")

  .engine(
    ".hbs",
    hbs.engine({
      extname: ".hbs",
    })
  )

  // Rutas
  .use("/", require("../routes/routes"));

module.exports = app;