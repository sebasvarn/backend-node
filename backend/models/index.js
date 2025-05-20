const Habitacion = require('./habitacion.model');
const Hotel = require('./hotel.model');
const Reserva = require('./reserva.model');
const Cliente = require('./cliente.model');
const sequelize = require('../config/database');
const { devNull } = require('os');

const db = {};
db.Sequelize = sequelize;
db.Hotel = Hotel;
db.Habitacion = Habitacion;
db.Reserva = Reserva;
db.Cliente = Cliente;

module.exports = db;
// Relaciones
db.Habitacion.belongsTo(db.Hotel, { foreignKey: 'hotelId', as: 'hotel' });
db.Hotel.hasMany(db.Habitacion, { foreignKey: 'hotelId', as: 'habitaciones' });
db.Reserva.belongsTo(db.Hotel, { foreignKey: 'hotelId', as: 'hotelReserva' });
db.Reserva.belongsTo(db.Habitacion, { foreignKey: 'habitacionId', as: 'habitacion' });
db.Reserva.belongsTo(db.Cliente, { foreignKey: 'clienteId', as: 'cliente' });