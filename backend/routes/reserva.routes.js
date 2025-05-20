const express = require('express');
const router = express.Router();
const controller = require('../controllers/reserva.controller');

router.get('/disponibles', controller.buscarDisponibles);
router.post('/', controller.crearReserva);
router.get('/', controller.listar);

module.exports = router;
