var express = require('express');
var router = express.Router();

const { createPost, updatePost, getPost, deletePost, addView } = require('../models/post');

//TODO: Check date format
//TODO: Check if post exist

router.get('/', function (req, res) {
  const { user, group } = req.query;
  const posts = getPost(Number(user), group);
  res.send(posts);
});

router.post('/', function (req, res) {
  const { authorId, title, content, description, group, img, dateEnd } = req.body;
  if (
    typeof authorId !== 'string' ||
    typeof title !== 'string' ||
    typeof content !== 'string' ||
    typeof description !== 'string' ||
    typeof group !== 'string' ||
    typeof img !== 'string' ||
    typeof dateEnd !== 'string'
  )
    return res.status(400).send({ error: true });

  const post = createPost(Number(authorId), title, content, description, group, img, dateEnd);
  res.send(post);
});

router.put('/', function (req, res) {
  const { id, title, content, description, img, dateEnd } = req.body;
  if (
    typeof id !== 'string' ||
    (typeof title !== 'string' &&
      typeof content !== 'string' &&
      typeof description !== 'string' &&
      typeof img !== 'string' &&
      typeof dateEnd !== 'string')
  )
    return res.status(400).send({ error: true });

  const post = updatePost(Number(id), title, content, description, img, dateEnd);
  res.send(post);
});

router.delete('/', function (req, res) {
  const { id } = req.body;
  deletePost(Number(id));
  res.status(200).send({ success: true });
});

/** VOTE **/

router.post('/vote', function (req, res) {});

router.get('/vote', function (req, res) {});

/** LIKE **/

router.post('/like', function (req, res) {});

router.get('/like', function (req, res) {});

router.delete('/like', function (req, res) {});

/** COMMENT **/

router.post('/comment', function (req, res) {});

router.get('/comment', function (req, res) {});

router.delete('/comment', function (req, res) {});

router.put('/comment', function (req, res) {});

router.post('/view', function (req, res) {
  const { id } = req.body;
  if (typeof id !== 'string') return res.status(400).send({ error: true });
  addView(Number(id));
  res.status(200).send({ success: true });
});

module.exports = router;
