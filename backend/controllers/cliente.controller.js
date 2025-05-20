const { Cliente } = require('../models');

exports.createOrFind = async (req, res) => {
  const { cedula, nombre, apellido } = req.body;

  let cliente = await Cliente.findOne({ where: { cedula } });

  if (!cliente) {
    cliente = await Cliente.create({ cedula, nombre, apellido });
    return res.status(201).json(cliente);
  }

  return res.status(200).json(cliente);
};

exports.findByCedula = async (req, res) => {
  const { cedula } = req.params;
  const cliente = await Cliente.findOne({ where: { cedula } });

  if (!cliente) {
    return res.status(404).json({ message: 'Cliente no encontrado' });
  }

  res.json(cliente);
};
