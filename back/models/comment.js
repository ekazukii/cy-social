const { createMockComment } = require('../utils/mockData');
const { asyncQuery } = require('./database');
const mysql = require('mysql2');
const comments = [createMockComment(1, 1), createMockComment(2, 2), createMockComment(3, 3), createMockComment(4, 1)];

const createComment = async (idPost, idUser, response, content) => {
  const sql = mysql.format(
    'INSERT INTO Comments (id_post, id_user, date, id_comment, content) VALUES (?, ?, ?, ?, ?)',
    [idPost, idUser, new Date(), response, content]
  );

  return asyncQuery(sql);
};

const getComment = async idPost => {
  const sql = mysql.format('SELECT * FROM Comments WHERE id_post = ?', [idPost]);
  return asyncQuery(sql);
};

const updateComment = async (id, content) => {
  const sql = mysql.format('UPDATE Comments SET content = ? WHERE id = ?', [content, id]);
  return asyncQuery(sql);
};

const deleteComment = async id => {
  const sql = mysql.format('DELETE FROM Comments WHERE id = ?', [id]);
  return asyncQuery(sql);
};

module.exports = { createComment, getComment, updateComment, deleteComment };
