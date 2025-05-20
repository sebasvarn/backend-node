const { Habitacion, Reserva, Hotel , Cliente} = require('../models');
const { Op } = require('sequelize');

exports.buscarDisponibles = async (req, res) => {
  const { fecha_ingreso, fecha_salida, capacidad } = req.query;

  if (!fecha_ingreso || !fecha_salida) {
    return res.status(400).json({ error: 'Debe enviar fecha_ingreso y fecha_salida' });
  }

  // Obtener habitaciones ya reservadas en ese rango
  const reservas = await Reserva.findAll({
    where: {
      [Op.or]: [
        {
          fechaIngreso: {
            [Op.between]: [fecha_ingreso, fecha_salida]
          }
        },
        {
          fechaSalida: {
            [Op.between]: [fecha_ingreso, fecha_salida]
          }
        },
        {
          fechaIngreso: { [Op.lte]: fecha_ingreso },
          fechaSalida: { [Op.gte]: fecha_salida }
        }
      ]
    }
  });

  const idsReservadas = reservas.map(r => r.habitacionId);

  const whereHabitaciones = {
    id: { [Op.notIn]: idsReservadas }
  };

  if (capacidad) {
    whereHabitaciones.capacidad = { [Op.gte]: capacidad };
  }

  const disponibles = await Habitacion.findAll({
    where: whereHabitaciones,
    include: [{ model: Hotel, as: 'hotel' }]
  });

  res.json(disponibles);
};

exports.crearReserva = async (req, res) => {
  try {
    const reserva = await Reserva.create(req.body);
    res.status(201).json(reserva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

exports.listar = async (req, res) => {
  const { hotelId, fechaIngreso, fechaSalida, clienteId } = req.query;

  if (!hotelId || !fechaIngreso) {
    return res.status(400).json({ error: 'hotelId y fechaIngreso son obligatorios' });
  }

  const condiciones = {
    hotelId,
    fechaIngreso: { [Op.gte]: fechaIngreso }
  };

  if (fechaSalida) {
    condiciones.fechaSalida = { [Op.lte]: fechaSalida };
  }

  if (clienteId) {
    condiciones.clienteId = clienteId;
  }

  const reservas = await Reserva.findAll({
    where: condiciones,
    include: [
      { model: Hotel, as: 'hotelReserva' },
      { model: Habitacion, as: 'habitacion' },
      { model: Cliente, as: 'cliente' }
    ],
    order: [
      ['fechaIngreso', 'ASC'],
      [{ model: Habitacion, as: 'habitacion' }, 'piso', 'ASC'],
      [{ model: Habitacion, as: 'habitacion' }, 'numero', 'ASC']
    ]
  });

  res.json(reservas);
};
