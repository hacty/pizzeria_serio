const app = require("/workspaces/pizzeria_serio/server/express.js");

const db = require("./db/sqlite");

app.listen(app.get("port"), () => {
    console.log("Servidor iniciado");
});