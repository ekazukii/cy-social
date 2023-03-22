const { createMockPost } = require('../utils/mockData');
const { asyncQuery } = require('./database');
const mysql = require('mysql2');
const _posts = [createMockPost(1), createMockPost(2), createMockPost(3), createMockPost(4), createMockPost(5)];

/**
 * create a notification in db
 * @param {Number} userId
 */
const getPost = async (user, group) => {
  let sql;
  if (typeof user !== 'undefined') {
    sql = mysql.format('SELECT * FROM Posts WHERE id_user = ? AND id_group = ?', [user, group]);
  } else {
    sql = mysql.format('SELECT * FROM posts WHERE id_group = ?', [group]);
  }
  return asyncQuery(sql);
};

const getPostWithCounts = async (user, group) => {
  let sql;
  if (typeof group !== 'undefined') {
    sql = mysql.format(
      'SELECT *, (SELECT COUNT(*) FROM Comments c WHERE c.id_post = p.id) AS comments, (SELECT COUNT(*) FROM Likes l WHERE l.id_post = p.id) as likes, (SELECT COUNT(*) FROM Votes v1 WHERE v1.id_post = p.id AND v1.vote = -1) as votes_against, (SELECT COUNT(*) FROM Votes v2 WHERE v2.id_post = p.id AND v2.vote = 0) as votes_neutral, (SELECT COUNT(*) FROM Votes v3 WHERE v3.id_post = p.id AND v3.vote = 1) AS votes_for FROM Posts p WHERE p.id_user = ? AND p.id_group = ? ORDER BY p.date_publi DESC LIMIT 20',
      [user, group]
    );
  } else {
    sql =
      'SELECT *, (SELECT COUNT(*) FROM Comments c WHERE c.id_post = p.id) AS comments, (SELECT COUNT(*) FROM Likes l WHERE l.id_post = p.id) as likes, (SELECT COUNT(*) FROM Votes v1 WHERE v1.id_post = p.id AND v1.vote = -1) as votes_against, (SELECT COUNT(*) FROM Votes v2 WHERE v2.id_post = p.id AND v2.vote = 0) as votes_neutral, (SELECT COUNT(*) FROM Votes v3 WHERE v3.id_post = p.id AND v3.vote = 1) AS votes_for FROM Posts p WHERE p.id_group IN (SELECT id_group FROM UsersGroups WHERE id_user = ' +
      +user +
      ') ORDER BY p.date_publi DESC LIMIT 20';
  }

  return asyncQuery(sql);
};

const updatePost = (id, title, content, description, img, dateEnd) => {
  const post = _posts.find(post => post.id === id);

  if (title) post.title = title;
  if (content) post.content = content;
  if (description) post.description = description;
  if (img) post.img = img;
  if (dateEnd) post.dateEnd = dateEnd;

  return post;
};

/**
 * create new post
 * @param {number} authorId
 * @param {String} title
 * @param {String} content
 * @param {String} description
 * @param {String} group
 * @param {String} img
 * @param {String} dateEnd iso string
 */
const createPost = (authorId, title, content, description, group, img, dateEnd) => {
  const post = {
    id: _posts[_posts.length - 1].id + 1,
    authorId: authorId,
    title,
    content,
    description,
    group,
    img,
    datePublished: new Date().toISOString(),
    dateEnd,
    nbrVue: 0,
    comments: []
  };

  _posts.push(post);

  return post;
};

const deletePost = id => {
  _posts = _posts.filter(post => post.id !== id);
};

const addView = id => {
  const post = _posts.find(post => post.id === id);
  post.nbrVue++;
};

module.exports = { createPost, updatePost, getPost, deletePost, addView, getPostWithCounts };
