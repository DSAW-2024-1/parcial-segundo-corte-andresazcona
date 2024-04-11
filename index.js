const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON ya que el profe me dijo que iba a ser mas facil asi
app.use(express.json());

// Ruta para obtener el precio de una moneda usando el nombre de la moneda de la API CoinCap
app.get('/coin/:coinName', async (req, res) => {
  const coinName = req.params.coinName.toLowerCase();
  try {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
    const { data } = response.data;
    if (data) {
      const priceUSD = data.priceUsd;
      res.send(`El precio en dólares de ${coinName} para el día de hoy es ${priceUSD}`);
    } else {
      res.status(404).send('El nombre de la moneda no fue encontrado en la base de datos por favor usa tu cabeza y escribe un nombre valido!');
    }
  } catch (error) {
    res.status(500).send('El nombre de la moneda no fue encontrado en la base de datos por favor usa tu cabeza y escribe un nombre valido!');
  }
});

// Ruta para obtener una lista de usuarios con un límite y orden específico para asi poder hacer un CRUD
app.get('/users', (req, res) => {
  let count = req.query.count ? parseInt(req.query.count) : 30;
  const sort = req.query.sort ? req.query.sort.toUpperCase() : 'ASC';

  // Aquí se simularía la obtención de la lista de usuarios de una base de datos esto se podria conectar a una base de datos noSQL como mongoDB
  let users = [
    { nombre: 'Samuel', apellido: 'Acero García' },
  { nombre: 'Darek', apellido: 'Aljuri Martínez' },
  { nombre: 'Juan Felipe', apellido: 'Cepeda Uribe' },
  { nombre: 'Ana María', apellido: 'Chaves Pérez' },
  { nombre: 'Carlos David', apellido: 'Cruz Pavas' },
  { nombre: 'Diego Norberto', apellido: 'Díaz Algarín' },
  { nombre: 'Jorge Esteban', apellido: 'Díaz Bernal' },
  { nombre: 'David Esteban', apellido: 'Díaz Vargas' },
  { nombre: 'Juan José', apellido: 'Forero Peña' },
  { nombre: 'Santiago', apellido: 'Gutiérrez de Piñeres Barbosa' },
  { nombre: 'Samuel Esteban', apellido: 'López Huertas' },
  { nombre: 'Michael Steven', apellido: 'Medina Fernández' },
  { nombre: 'Katherin Juliana', apellido: 'Moreno Carvajal' },
  { nombre: 'Juan Pablo', apellido: 'Moreno Patarroyo' },
  { nombre: 'Nicolás Esteban', apellido: 'Muñoz Sendoya' },
  { nombre: 'Santiago', apellido: 'Navarro Cuy' },
  { nombre: 'Juan Pablo', apellido: 'Parrado Morales' },
  { nombre: 'Daniel Santiago', apellido: 'Ramírez Chinchilla' },
  { nombre: 'Juan Pablo', apellido: 'Restrepo Coca' },
  { nombre: 'Gabriela', apellido: 'Reyes González' },
  { nombre: 'Juan José', apellido: 'Rodríguez Falla' },
  { nombre: 'Valentina', apellido: 'Ruiz Torres' },
  { nombre: 'Mariana', apellido: 'Salas Gutiérrez' },
  { nombre: 'Sebastián', apellido: 'Sánchez Sandoval' },
  { nombre: 'Josué David', apellido: 'Sarmiento Guarinzo' },
  { nombre: 'Santiago', apellido: 'Soler Prado' },
  { nombre: 'María Fernanda', apellido: 'Tamayo López' },
  { nombre: 'Deivid Nicolás', apellido: 'Urrea Lara' },
  { nombre: 'Andrés', apellido: 'Azcona' }
  ];
// Aquí se ordena la lista de usuarios según el parámetro sort
  if (sort === 'ASC') {
    users.sort((a, b) => a.apellido.localeCompare(b.apellido));
  } else if (sort === 'DESC') {
    users.sort((a, b) => b.apellido.localeCompare(a.apellido));
  }

  if (count > users.length) {
    count = users.length;
  }

  users = users.slice(0, count);
  res.json(users);
});

// Ruta para crear un usuario
app.post('/users', (req, res) => {
  const { nombre, apellido, correo, ciudad = 'Bogotá', país = 'Colombia' } = req.body;
  if (!nombre || !apellido || !correo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios sherlock!' });
  }
  // Aquí se simularía la creación del usuario en una base de datos
  const newUser = { nombre, apellido, correo, ciudad, país };
  res.status(201).json(newUser);
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal muy mal pana!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado y funcionando tan fino como el vino español en el puerto ${PORT}`);
});

// Codificado unica y exclusivamente por: Andres Azcona 2024