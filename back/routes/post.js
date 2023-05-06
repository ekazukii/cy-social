var express = require('express');
var router = express.Router();

const { createPost, updatePost, getPostWithCounts, deletePost, addView, getPost } = require('../models/post');
const { createVote, updateVote, deleteVote, getVote } = require('../models/vote');
const { createLike, getLike, updateLike, deleteLike } = require('../models/like');
const { createComment, getComment, updateComment, deleteComment } = require('../models/comment');
const { generatePostNotifs, generateCommentNotifs, generateLikeNotifs } = require('../models/notif');
const { getUsers } = require('../models/user');

//TODO: Check date format
//TODO: Check if post exist

router.get('/', async function (req, res) {
  const { user, group } = req.query;
  const posts = await getPost(Number(user), group ? Number(group) : undefined);
  res.send(posts);
});

router.get('/tl', async function (req, res) {
  const { user, group } = req.query;
  const posts = await getPostWithCounts(Number(user), group ? Number(group) : undefined);
  let authorsId = posts.map(post => post['id_user']);
  authorsId = [...new Set(authorsId)];
  const usersArray = await getUsers(authorsId);
  let users = {};

  usersArray.forEach(user => {
    users[user.id] = user;
  });

  res.send({ posts, users });
});

router.post('/', async function (req, res) {
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

  const post = await createPost(Number(authorId), title, content, group, img, dateEnd);
  const postId = post.insertId;

  generatePostNotifs(postId, authorId, group, title);
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

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const posts = await getPost(undefined, undefined, id);
  const post = posts[0];
  const comments = await getComment(post.id);

  res.status(200).send({
    post,
    comments
  });
});

router.get('/:id/likes', async function (req, res) {
  const { id } = req.params;
  const likes = await getLike(id);
  res.status(200).send({
    likes
  });
});

router.get('/:id/votes', async function (req, res) {
  const { id } = req.params;
  const votes = await getVote(id);
  res.status(200).send({
    votes
  });
});

/** VOTE **/

// getVote(id, user)
// If vote already exist, update it
router.post('/vote', function (req, res) {
  const { id, user, vote } = req.body;
  if (typeof id !== 'string' || typeof user !== 'string' || typeof vote !== 'string')
    return res.status(400).send({ error: true });

  const oldVote = getVote(Number(id), Number(user));
  if (oldVote.length === 1) {
    const newVote = updateVote(Number(id), Number(user), vote === 'true');
    return res.send(newVote);
  }

  const newVote = createVote(Number(id), Number(user), vote === 'true');
  res.send(newVote);
});

router.get('/vote', function (req, res) {
  const { id } = req.query;
  if (typeof id !== 'string') return res.status(400).send({ error: true });
  const votes = getVote(Number(id), Number(user));
  res.send(votes);
});

/** LIKE **/

router.post('/like', async function (req, res) {
  const { id, user } = req.body;
  if (id == undefined || user == undefined) return res.status(400).send({ error: true });

  const oldLike = await getLike(Number(id), Number(user));
  if (oldLike.length === 1) {
    const newLike = await updateLike(Number(id), Number(user), 0);
    return res.send(newLike);
  }

  const newLike = await createLike(Number(id), Number(user), 0);
  generateLikeNotifs(Number(user), Number(id));
  res.send(newLike);
});

router.get('/like', function (req, res) {
  const { id, user } = req.query;
  if (typeof id !== 'string' || typeof user !== 'string') return res.status(400).send({ error: true });
  const like = getLike(Number(id), Number(user));
  res.send(like);
});

router.delete('/like', function (req, res) {
  const { id, user } = req.body;
  if (id === undefined || user === undefined) return res.status(400).send({ error: true });
  deleteLike(Number(id), Number(user));
  res.status(200).send({ success: true });
});

/** COMMENT **/

router.post('/comment', async function (req, res) {
  const { idPost, content, idUser, response } = req.body;
  if (typeof idPost !== 'string' || typeof content !== 'string' || typeof idUser === undefined)
    return res.status(400).send({ error: true });

  const comment = await createComment(Number(idPost), Number(idUser), null, content);
  generateCommentNotifs(idPost, idUser, content);
  res.send(comment);
});

router.get('/comment', function (req, res) {
  const { id } = req.query;
  if (typeof id !== 'string') return res.status(400).send({ error: true });
  const comments = getComment(Number(id));
  res.send(comments);
});

router.delete('/comment', function (req, res) {
  const { id } = req.body;
  if (typeof id !== 'string') return res.status(400).send({ error: true });
  deleteComment(Number(id));
  res.status(200).send({ success: true });
});

router.put('/comment', function (req, res) {
  const { id, content } = req.body;
  if (typeof id !== 'string' || typeof content !== 'string') return res.status(400).send({ error: true });
  const comment = updateComment(Number(id), content);
  res.send(comment);
});

router.post('/view', function (req, res) {
  const { id } = req.body;
  if (typeof id !== 'string') return res.status(400).send({ error: true });
  addView(Number(id));
  res.status(200).send({ success: true });
});

module.exports = router;
