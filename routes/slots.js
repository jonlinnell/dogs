const router = require('express').Router();

const createSlot = require('../helpers/slots/createSlot');

router.post('/', (req, res) => createSlot(req.body)
  .then(message => res.send(message))
  .catch(error => res.status(500).send(error)));

router.get('/', (req, res) => { res.send('Gets all Slots'); });

router.get('/:id', (req, res) => { res.send(`returns info for slot ${req.params.id}`); });

router.delete('/:id', (req, res) => { res.send(`Deletes router with ID ${req.params.id}`); });

router.put('/:id', (req, res) => { res.send(`Updates route with ID ${req.params.id}`); });

module.exports = router;
