var express = require('express');
var router = express.Router();

const { getUser, createUser, updateUser, deleteUser, getUsers } = require('../models/user');
const { createVote, updateVote, deleteVote, getVote } = require('../models/vote');
const { createLike, getLike, updateLike, deleteLike } = require('../models/like');

router.get('/', function (req, res) {});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  if (id) {
    const user = await getUser(parseInt(id));
    res.status(200).send(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.get('/:id/likes', async function (req, res) {
  const { id } = req.params;
  if (id) {
    const likes = await getLike(null, id);
    res.status(200).send(likes);
  } else {
    res.status(404).send('User not found');
  }
});

router.get('/:id/votes', async function (req, res) {
  const { id } = req.params;
  if (id) {
    const votes = await getVote(null, id);
    res.status(200).send(votes);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/', function (req, res) {});

router.put('/', function (req, res) {});

router.delete('/', function (req, res) {});

router.post('/follow', function (req, res) {});

router.delete('/follow', function (req, res) {});

module.exports = router;
