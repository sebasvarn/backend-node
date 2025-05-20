const { Habitacion, Hotel } = require('../models');

exports.getAll = async (req, res) => {
  const habitaciones = await Habitacion.findAll({ include: ['hotel'] });
  res.json(habitaciones);
};

exports.getPorPiso = async (req, res) => {
  const { hotelId, piso } = req.query;

  if (!hotelId || !piso) {
    return res.status(400).json({ message: 'Faltan parámetros: hotelId y piso son requeridos.' });
  }

  try {
    const habitaciones = await Habitacion.findAll({
      where: {
        hotelId,
        piso
      },
      include: [{ model: Hotel, as: 'hotel' }]
    });

    res.json(habitaciones);
  } catch (error) {
    console.error('Error al filtrar habitaciones por piso:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


exports.create = async (req, res) => {
  const habitacion = await Habitacion.create(req.body);
  res.status(201).json(habitacion);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Habitacion.update(req.body, { where: { id } });
  res.json({ message: 'Habitación actualizada' });
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Habitacion.destroy({ where: { id } });
  res.json({ message: 'Habitación eliminada' });
};
