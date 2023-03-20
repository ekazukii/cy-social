var express = require('express');
var router = express.Router();
const { createMockPost } = require('../utils/mockData');

const _posts = [createMockPost(1), createMockPost(2), createMockPost(3), createMockPost(4), createMockPost(5)];

//TODO: Check date format
//TODO: Check if post exist

router.get('/', function (req, res) {
  const { user, group } = req.query;
  let posts = _posts;
  if (typeof user === 'string') {
    posts = posts.filter(post => post.authorId === Number(user));
  }
  if (typeof group === 'string') {
    posts = posts.filter(post => post.group === group);
  }
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

  _posts.push({
    id: _posts[_posts.length - 1].id + 1,
    authorId: Number(authorId),
    title,
    content,
    description,
    group,
    img,
    datePublished: new Date().toISOString(),
    dateEnd: dateEnd,
    nbrVue: 0,
    comments: []
  });

  res.send(_posts);
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

  const post = _posts.find(post => post.id === Number(id));

  if (title) post.title = title;
  if (content) post.content = content;
  if (description) post.description = description;
  if (img) post.img = img;
  if (dateEnd) post.dateEnd = dateEnd;

  res.send(post);
});

router.delete('/', function (req, res) {
  const { id } = req.body;
  //const oldLength = _posts.length;
  _posts = _posts.filter(post => post.id !== Number(id));
  res.status(200).send(_posts);
});

module.exports = router;

// {
//   target: String,
//   source: String,
//   content: String,
//   link: String,
//   type: String,
//   time: Date
// }
