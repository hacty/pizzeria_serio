const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./pizzeria.db", (err) => {
  if (err) {
    console.error("Error al conectar:", err.message);
  } else {
    console.log("✅ Conectado a SQLite");
  }
});

// ACTIVAR FOREIGN KEYS
db.run(`PRAGMA foreign_keys = ON`);

// TABLA EMPLEADO
db.run(`
  CREATE TABLE IF NOT EXISTS Empleado (
    id_empleado TEXT PRIMARY KEY,
    nombre TEXT,
    apellido TEXT,
    cargo TEXT,
    telefono TEXT,
    fecha_contratacion DATE,
    password TEXT
  )
`);

// TABLA CLIENTE
db.run(`
  CREATE TABLE IF NOT EXISTS Cliente (
    id_cliente TEXT PRIMARY KEY,
    nombre TEXT,
    apellido TEXT,
    telefono TEXT,
    direccion TEXT,
    correo TEXT
  )
`);

// TABLA CATEGORIA
db.run(`
  CREATE TABLE IF NOT EXISTS Categoria (
    id_categoria TEXT PRIMARY KEY,
    nombre_categoria TEXT
  )
`);

// TABLA PRODUCTO
db.run(`
  CREATE TABLE IF NOT EXISTS Producto (
    id_producto TEXT PRIMARY KEY,
    nombre_producto TEXT,
    imagen TEXT,
    descripcion TEXT,
    precio REAL,
    id_categoria TEXT,

    FOREIGN KEY (id_categoria)
      REFERENCES Categoria(id_categoria)
  )
`);

// TABLA PEDIDO
db.run(`
  CREATE TABLE IF NOT EXISTS Pedido (
    id_pedido TEXT PRIMARY KEY,
    fecha_pedido TIMESTAMP,
    tipo_pedido TEXT,
    estado TEXT,
    total REAL,

    id_cliente TEXT,
    id_empleado TEXT,

    FOREIGN KEY (id_cliente)
      REFERENCES Cliente(id_cliente),

    FOREIGN KEY (id_empleado)
      REFERENCES Empleado(id_empleado)
  )
`);

// TABLA DETALLE_PEDIDO
db.run(`
  CREATE TABLE IF NOT EXISTS Detalle_pedido (
    id_detalle TEXT PRIMARY KEY,

    id_pedido TEXT,
    id_producto TEXT,

    cantidad INTEGER,
    subtotal REAL,

    FOREIGN KEY (id_pedido)
      REFERENCES Pedido(id_pedido),

    FOREIGN KEY (id_producto)
      REFERENCES Producto(id_producto)
  )
`);

// TABLA PAGO
db.run(`
  CREATE TABLE IF NOT EXISTS Pago (
    id_pago TEXT PRIMARY KEY,

    id_pedido TEXT,

    metodo_pago TEXT,
    monto REAL,
    fecha_pago DATE,

    FOREIGN KEY (id_pedido)
      REFERENCES Pedido(id_pedido)
  )
`);

module.exports = db;