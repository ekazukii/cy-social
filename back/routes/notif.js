var express = require('express');
var router = express.Router();
const { createMockNotif } = require('../utils/mockData');

//TODO: Check date format

let _notifs = [createMockNotif(1), createMockNotif(2), createMockNotif(3)];

router.get('/', function (req, res) {
  const { user } = req.query;
  if (typeof user !== 'string') return res.status(400).send({ error: true });
  res.send(_notifs.filter(notif => notif.target === Number(user)));
});

router.put('/', function (req, res) {
  const { id, read } = req.body;
  if (typeof id !== 'string' || typeof read !== 'string') return res.status(400).send({ error: true });

  const notif = _notifs.find(notif => notif.id === Number(id));
  notif.read = read === 'true';
  res.send(notif);
});

router.delete('/', function (req, res) {
  const { id } = req.body;
  if (typeof id !== 'string') return res.status(400).send({ error: true });
  _notifs = _notifs.filter(notif => notif.id !== Number(id));
  res.status(200).send(_notifs);
});

module.exports = router;
