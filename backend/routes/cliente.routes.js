const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente.controller');

router.post('/', controller.createOrFind);
router.get('/:cedula', controller.findByCedula);

module.exports = router;
