const express = require("express");

const session = require("express-session");

const hbs = require("express-handlebars");

const path = require("path");

const app = express();

app

  // PUERTO
  .set("port", process.env.PORT || 3000)

  // ARCHIVOS PUBLICOS
  .use(express.static(path.join(__dirname, "../public")))

  // LEER FORMULARIOS
  .use(express.urlencoded({ extended: true }))

  // SESIONES
  .use(
    session({

      secret: "dashboardfeliz",

      resave: false,

      saveUninitialized: false,

    })
  )

  // USUARIO GLOBAL
  .use((req, res, next) => {

    res.locals.usuario = req.session.usuario;

    next();

  })

  // CARPETA VIEWS
  .set("views", path.join(__dirname, "../views"))

  // HANDLEBARS
  .set("view engine", ".hbs")

  .engine(
    ".hbs",

    hbs.engine({

      extname: ".hbs",

      helpers: {

        eq: function(a, b){

          return a === b;

        }

      }

    })
  )

  // RUTAS
  .use("/", require("../routes/routes"));

module.exports = app;