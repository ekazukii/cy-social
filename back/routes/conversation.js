var express = require('express');
var router = express.Router();
// const { createMockNotif } = require('../utils/mockData');
const { getConversations, createConversation } = require('../models/conversation');

//TODO: Check date forma

router.get('/', async function (req, res) {
  const { user } = req.query;
  const conversations = await getConversations(Number(user));
  res.send(conversations);
});

router.post('/', async function (req, res) {
  const { id_user, id_author, title } = req.body;
  if (id_user === undefined || id_author === undefined || typeof title !== 'string')
    return res.status(400).send({ error: true });

  const post = await createConversation(Number(id_user), Number(id_author), title);
  res.send(post);
});

router.put('/', function (req, res) {});

router.delete('/', function (req, res) {});

router.get('/group', function (req, res) {});

router.post('/group', function (req, res) {});

router.put('/group', function (req, res) {});

router.delete('/group', function (req, res) {});

module.exports = router;
