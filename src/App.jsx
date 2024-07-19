import React, { useState, useEffect } from 'react';

function App() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Accede a la variable de entorno
    const apiUrl = import.meta.env.VITE_API_PRODUCTOS;

    // Realiza la solicitud a la API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        setProductos(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>Lista de Productos</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {productos.map(producto => (
            <li key={producto.id}>{producto.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
