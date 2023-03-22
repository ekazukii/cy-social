const { createMockComment } = require('../utils/mockData');
const { asyncQuery } = require('./database');
const mysql = require('mysql');
const comments = [createMockComment(1, 1), createMockComment(2, 2), createMockComment(3, 3), createMockComment(4, 1)];

const createComment = (idPost, idUser, response, content) => {
  const id = comments.length + 1;
  const comment = { id, idPost, authorId: idUser, date: new Date().toISOString(), response, content };
  comments.push(comment);
  return comment;
};

const getComment = async idPost => {
  const sql = mysql.format('SELECT * FROM Comments WHERE id_post = ?', [idPost]);
  return asyncQuery(sql);
};

const updateComment = (id, content) => {
  const comment = comments.find(comment => comment.id === id);
  if (!comment) return null;
  if (content) comment.content = content;

  return comment;
};

const deleteComment = id => {
  comments = comments.filter(comment => comment.id !== id);
};

module.exports = { createComment, getComment, updateComment, deleteComment };
