var express = require('express');
var router = express.Router();
const { createGroup, deleteGroup, updateGroup, getGroup, getGroupsOf } = require('../models/group');

router.get('/', async function (req, res) {
  const { user } = req.query;
  if (typeof user !== 'string') return res.status(400).send({ error: true });

  const groups = await getGroupsOf(Number(user));
  return res.status(200).send({ error: false, groups });
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const group = await getGroup(Number(id));
  return res.status(200).send({ error: false, group });
});

router.post('/', async function (req, res) {
  const { name, img, description } = req.body;
  if (typeof name !== 'string' || typeof description !== 'string' || typeof img !== 'string')
    return res.status(400).send({ error: true });
  await createGroup(name, false, img, description);
  return res.status(200).send({ error: false });
});

router.put('/', function (req, res) {});

router.delete('/', function (req, res) {});

module.exports = router;
