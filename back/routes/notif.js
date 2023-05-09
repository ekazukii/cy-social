var express = require('express');
var router = express.Router();

const { updateNotif, getNotif, deleteNotif } = require('../models/notif');

//TODO: Check date format

router.get('/', async function (req, res) {
  const { user } = req.query;
  if (typeof user !== 'string') return res.status(400).send({ error: true });
  const notifs = await getNotif(Number(user));
  res.send(notifs);
});

router.put('/', function (req, res) {
  const { id, read } = req.body;
  if (typeof id !== 'string' || typeof read !== 'string') return res.status(400).send({ error: true });
  const notif = updateNotif(Number(id), read === 'true');
  res.send(notif);
});

router.delete('/', function (req, res) {
  const { id } = req.body;
  if (id === undefined) return res.status(400).send({ error: true });
  deleteNotif(Number(id));
  res.status(200).send({ success: true });
});

module.exports = router;
