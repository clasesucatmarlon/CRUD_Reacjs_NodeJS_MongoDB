const mongoose = require('mongoose');

// Crear esquema para Productos
const ProductosSchema = new mongoose.Schema({
    numeroRegistro: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    }
})

const Productos = mongoose.model("articulos", ProductosSchema);
module.exports = Productos;