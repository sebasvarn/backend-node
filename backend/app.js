const express = require('express');
const app = express();
const db = require('./models');
const hotelRoutes = require('./routes/hotel.routes');
const reservaRoutes = require('./routes/reserva.routes');
const clienteRoutes = require('./routes/cliente.routes');
const habitacionRoutes = require('./routes/habitacion.routes');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/hoteles', hotelRoutes);
app.use('/clientes', clienteRoutes);
app.use('/reservas', reservaRoutes);
app.use('/habitaciones', habitacionRoutes);
app.use(express.static(path.join(__dirname, 'frontend')));

db.Sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
});



