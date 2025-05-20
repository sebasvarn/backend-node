const express = require('express');
const router = express.Router();
const controller = require('../controllers/habitacion.controller');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/por-piso', controller.getPorPiso);

module.exports = router;
