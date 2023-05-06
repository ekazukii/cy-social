var express = require('express');
var router = express.Router();

const { getUser, createUser, updateUser, deleteUser, getUsers, getFollowers, getFollowing } = require('../models/user');
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

router.get('/:id/followers', async function (req, res) {
  const { id } = req.params;
  if (id) {
    const followers = await getFollowers(id);
    res.status(200).send(followers);
  } else {
    res.status(404).send('User not found');
  }
});

router.get('/:id/following', async function (req, res) {
  const { id } = req.params;
  if (id) {
    const following = await getFollowing(id);
    res.status(200).send(following);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/', async function (req, res) {
  const { username, name, mail, tel, password, img } = req.body;
  try {
    await createUser(username, name, mail, tel, '', null, 0, password, JSON.stringify(img));
    res.status(200).send({ error: false });
  } catch (e) {
    res.status(400).send({ error: true });
  }
});

router.put('/', function (req, res) {});

router.delete('/', function (req, res) {});

router.post('/follow', function (req, res) {});

router.delete('/follow', function (req, res) {});

module.exports = router;
