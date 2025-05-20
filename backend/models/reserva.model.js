const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hotelId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  habitacionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fechaIngreso: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fechaSalida: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  cantidadPersonas: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Reserva;
