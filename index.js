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
    res.status(500).send('Error al obtener el precio de la moneda por favor intenta de nuevo más tarde porque no quiero hacer nada ahorita!');
  }
});

// Ruta para obtener una lista de usuarios con un límite y orden específico
app.get('/users', (req, res) => {
  let count = req.query.count ? parseInt(req.query.count) : 10;
  const sort = req.query.sort ? req.query.sort.toUpperCase() : 'ASC';

  // Aquí se simularía la obtención de la lista de usuarios de una base de datos esto se podria conectar a una base de datos noSQL como mongoDB
  let users = [
    { nombre: 'Juan', apellido: 'Perez' },
    { nombre: 'María', apellido: 'Gomez' },
    { nombre: 'Pedro', apellido: 'Diaz' },
    { nombre: 'Juan', apellido: 'Murillo' },
    { nombre: 'Ivan', apellido: 'Duque' },
    { nombre: 'Scott', apellido: 'Travis' },
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
  console.log(`Servidor iniciado y funcionando tan fino como el caviar en el puerto ${PORT}`);
});

// Codificado unica y exclusivamente por: Andres Azcona 2024