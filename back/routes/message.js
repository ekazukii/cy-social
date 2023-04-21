var express = require('express');
var router = express.Router();
// const { createMockNotif } = require('../utils/mockData');
const { getMessages } = require('../models/message');

//TODO: Check date forma

router.get('/', async function (req, res) {
    const { conv } = req.query;
    const messages = await getMessages(Number(conv));
    res.send(messages);
});

router.post('/', function (req, res) {});

router.put('/', function (req, res) {});

router.delete('/', function (req, res) {});

router.get('/group', function (req, res) {});

router.post('/group', function (req, res) {});

router.put('/group', function (req, res) {});

router.delete('/group', function (req, res) {});

module.exports = router;
