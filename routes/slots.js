const router = require('express').Router();

const createSlot = require('../helpers/slots/createSlot');
const updateSlot = require('../helpers/slots/updateSlot');
const findSlots = require('../helpers/slots/findSlots');
const deleteSlot = require('../helpers/slots/deleteSlot');

router.post('/', (req, res) =>
  createSlot(req.body)
    .then(newSlot => res.send(newSlot))
    .catch(error => res.status(500).send(error))
);

router.get('/', (req, res) =>
  findSlots()
    .then(slots => res.send(slots))
    .catch(error => res.status(500).send(error))
);

router.get('/:id', (req, res) =>
  findSlots(req.params.id)
    .then(slot => res.send(slot))
    .catch(error => res.status(500).send(error))
);

router.delete('/:id', (req, res) => {
  deleteSlot(req.params.id)
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error));
});

router.put('/:id', (req, res) =>
  updateSlot(req.params.id, req.body)
    .then(updatedSlot => res.send(updatedSlot))
    .catch(error => res.status(500).send(error))
);

module.exports = router;
