const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Hotel = require('./hotel.model');

const Habitacion = sequelize.define('Habitacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hotelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Hotels',
      key: 'id'
    }
  },
  posicionX: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  posicionY: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  piso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  caracteristicas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Habitacion;
