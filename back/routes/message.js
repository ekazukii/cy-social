var express = require('express');
var router = express.Router();
// const { createMockNotif } = require('../utils/mockData');
const { getMessages, createMessage } = require('../models/message');

//TODO: Check date forma

router.get('/', async function (req, res) {
    const { conv } = req.query;
    const messages = await getMessages(Number(conv));
    res.send(messages);
});

router.post('/', async function (req, res) {
    const {id_conv, id_user, content} = req.body;
    if (
      typeof id_conv !== 'string' ||
      typeof id_user !== 'string' ||
      typeof content !== 'string'
    )
      return res.status(400).send({ error: true });
  
    const post = await createMessage(Number(id_conv), Number(id_user), content);
    res.send(post);
});

router.put('/', function (req, res) {});

router.delete('/', function (req, res) {});

router.get('/group', function (req, res) {});

router.post('/group', function (req, res) {});

router.put('/group', function (req, res) {});

router.delete('/group', function (req, res) {});

module.exports = router;
