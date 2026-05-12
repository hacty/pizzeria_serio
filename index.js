const app = require("/workspaces/pizzeria_serio/server/express.js");

app.listen(app.get("port"), () => {
    console.log("Servidor iniciado");
});