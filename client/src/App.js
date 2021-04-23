import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  // Estados para manejar los datos
  const [currentId, setCurrentId] = useState('')
  const [registro, setRegistro] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [productosList, setProductosList] = useState([]);
  const [statusAgregar, setStatusAgregar] = useState(true);
  const [statusActualizar, setStatusActualizar] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setProductosList(response.data);
    })
  }, [productosList])

  // Insertar producto
  const handleAdd = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/insert", {
      numeroRegistro: registro,
      nombre: nombre,
      descripcion: descripcion,
    })
    setRegistro(0);
    setNombre('');
    setDescripcion('');
  }

  // Capturar elementos de la lista
  const handleUpdate = (id, reg, nomb, descr) => {
    setStatusActualizar(true)
    setStatusAgregar(false)
    //console.log(id, reg, nomb, descr)
    setCurrentId(id)
    setRegistro(reg);
    setNombre(nomb);
    setDescripcion(descr);
  }

  // Actualizar producto
  const actualizarProducto = () => {
    //console.log(currentId, registro, nombre, descripcion)
    setStatusActualizar(false)
    setStatusAgregar(true)
    Axios.put("http://localhost:3001/update", {
      id: currentId,
      numeroRegistro: registro,
      nombre: nombre,
      descripcion: descripcion,
    })
    setRegistro(0);
    setNombre('');
    setDescripcion('');
  }

  // Borrar producto
  const handleDeleted = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
    Axios.get("http://localhost:3001/read").then((response) => {
      setProductosList(response.data);
    })
  }

  return (
    <div className="App container">

      <h1 className="text-center mt-5 mb-4 ">Control de productos</h1>
      <div className="row d-flex justify-content-center align-items-center">

        <form className="formulario">

          <label className="formulario-label" >Número de registro:</label>
          <input
            type="number"
            className="form-control"
            value={registro}
            placeholder="Número de registro"
            onChange={(event) => setRegistro(event.target.value)}
          />

          <label className="mt-3 formulario-label">Nombre del producto:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />

          <label className="mt-3 formulario-label">Descripción del producto:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Descripción del producto"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />
          <div className="mt-3 d-flex justify-content-end">
            {
              statusAgregar ? 
              (<button onClick={handleAdd}>Agregar   producto</button>) 
              : 
              ('')
            }

            {
              statusActualizar ? 
                (<button onClick={actualizarProducto}>Actualizar producto</button>)
                : 
                ('')
            }
          </div>
        </form>

        <h1 className="text-center mb-5">Lista de productos</h1>

        <table className="table  table-striped table-hover">
          <thead>
            <tr className="table-primary">
              <th scope="col">#</th>
              <th scope="col">Registro</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody >
            {
              productosList.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.numeroRegistro}</td>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    <div className="cursor-actions">
                      <a href="#/" className="btn-delete" onClick={() => handleUpdate(item._id, item.numeroRegistro, item.nombre, item.descripcion)}>
                        <i className="bi bi-pencil text-success"></i>
                      </a>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <a href="#/" className="btn-edit" onClick={() => handleDeleted(item._id)}>
                        <i className="bi bi-trash text-danger"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default App;
