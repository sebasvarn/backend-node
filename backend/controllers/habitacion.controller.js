const { Habitacion, Hotel } = require('../models');

exports.getAll = async (req, res) => {
  const habitaciones = await Habitacion.findAll({ include: ['hotel'] });
  res.json(habitaciones);
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
