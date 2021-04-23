const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Importar modelo de productos
const ProductosModel = require('./models/Productos');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://user_root:root1234567@crud.akqxk.mongodb.net/productos?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

// Endpoint para insertar
app.post('/insert', async(req, res) => {
    // Capturando valores enviados desde el fronted - Formulario
    // console.log(req.body)
    const numeroRegistro = req.body.numeroRegistro;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const producto = new ProductosModel({numeroRegistro: numeroRegistro, nombre: nombre, descripcion: descripcion});
    try {
        await producto.save();
        res.send("Inserted data into table articles")
    } catch {
        console.log(err)
    }
})

// Endpoint para consultar
app.get('/read', async(req, res) => {
    ProductosModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})

// Endpoint para actualizar
app.put('/update', async(req, res) => {
    // Capturando valores enviados desde el fronted - Formulario
    //console.log(req.body)
    const newRegistro = req.body.numeroRegistro;
    const newNombre = req.body.nombre;
    const NewDescripcion = req.body.descripcion;
    const id = req.body.id;
    try {
        ProductosModel.findById(id, (err, updatedProducto) => {
            updatedProducto.numeroRegistro = newRegistro
            updatedProducto.nombre = newNombre
            updatedProducto.descripcion = NewDescripcion
            updatedProducto.save()
            res.send("Actualizado....");
        } )
    } catch (err) {
        console.log(err)
    }
})

app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
    await ProductosModel.findByIdAndRemove(id).exec();
    res.send("Eliminado....");
})


app.listen(3001, () => {
    console.log("Server running in port 3001......")
})