const { asyncQuery } = require('./database');
const mysql = require('mysql2');
const _posts = [createMockPost(1), createMockPost(2), createMockPost(3), createMockPost(4), createMockPost(5)];

/**
 * create a notification in db
 * @param {Number} userId
 */
const getPost = async (user, group, id) => {
  let sql;
  if (typeof user !== 'undefined') {
    sql = mysql.format('SELECT * FROM `Posts` WHERE id_user = ?', [user]);
  } else if (typeof group !== 'undefined') {
    sql = mysql.format('SELECT * FROM `Posts` WHERE id_group = ?', [group]);
  } else if (typeof id !== 'undefined') {
    sql = mysql.format('SELECT * FROM `Posts` WHERE id = ?', [id]);
  }
  return asyncQuery(sql);
};

const getPostWithCounts = async (user, group) => {
  let sql;
  if (typeof group !== 'undefined') {
    sql = mysql.format(
      'SELECT *, (SELECT COUNT(*) FROM `Comments` c WHERE c.id_post = p.id) AS comments, (SELECT COUNT(*) FROM `Likes` l WHERE l.id_post = p.id) as likes, (SELECT COUNT(*) FROM `Votes` v1 WHERE v1.id_post = p.id AND v1.vote = -1) as votes_against, (SELECT COUNT(*) FROM `Votes` v2 WHERE v2.id_post = p.id AND v2.vote = 0) as votes_neutral, (SELECT COUNT(*) FROM `Votes` v3 WHERE v3.id_post = p.id AND v3.vote = 1) AS votes_for FROM `Posts` p WHERE p.id_user = ? AND p.id_group = ? ORDER BY p.date_publi DESC LIMIT 20',
      [user, group]
    );
  } else {
    sql =
      'SELECT *, (SELECT COUNT(*) FROM `Comments` c WHERE c.id_post = p.id) AS comments, (SELECT COUNT(*) FROM `Likes` l WHERE l.id_post = p.id) as likes, (SELECT COUNT(*) FROM `Votes` v1 WHERE v1.id_post = p.id AND v1.vote = -1) as votes_against, (SELECT COUNT(*) FROM `Votes` v2 WHERE v2.id_post = p.id AND v2.vote = 0) as votes_neutral, (SELECT COUNT(*) FROM `Votes` v3 WHERE v3.id_post = p.id AND v3.vote = 1) AS votes_for FROM `Posts` p WHERE p.id_group IN (SELECT id_group FROM `UsersGroups` WHERE id_user = ' +
      +user +
      ') ORDER BY p.date_publi DESC LIMIT 20';
  }

  return asyncQuery(sql);
};

const updatePost = (id, title, content, img, dateEnd) => {
  const sql = mysql.format('UPDATE `Posts` SET title = ?, content = ?, img = ?, date_fin = ? WHERE id = ?', [
    title,
    content,
    img,
    dateEnd,
    id
  ]);

  return asyncQuery(sql);
};

/**
 * create new post
 * @param {number} authorId
 * @param {String} title
 * @param {String} content
 * @param {String} group
 * @param {String} img
 * @param {String} dateEnd iso string
 */
const createPost = (authorId, title, content, group, img, dateEnd) => {
  const sql = mysql.format(
    'INSERT INTO `Posts` (id_user, title, content, id_group, img, date_publi, date_fin, view_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [authorId, title, content, group, img, new Date(), dateEnd, 0]
  );

  return asyncQuery(sql);
};

const deletePost = id => {
  const sql = mysql.format('DELETE FROM `Posts` WHERE id = ?', [id]);
  return asyncQuery(sql);
};

const addView = id => {
  const sql = mysql.format('UPDATE `Posts` SET view_count = view_count + 1 WHERE id = ?', [id]);
  return asyncQuery(sql);
};

module.exports = { createPost, updatePost, getPost, deletePost, addView, getPostWithCounts };
