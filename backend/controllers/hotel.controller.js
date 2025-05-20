const { Hotel } = require('../models');

exports.getAll = async (req, res) => {
  const hoteles = await Hotel.findAll();
  res.json(hoteles);
};

exports.create = async (req, res) => {
  const hotel = await Hotel.create(req.body);
  res.status(201).json(hotel);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Hotel.update(req.body, { where: { id } });
  res.json({ message: 'Hotel actualizado' });
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Hotel.destroy({ where: { id } });
  res.json({ message: 'Hotel eliminado' });
};
