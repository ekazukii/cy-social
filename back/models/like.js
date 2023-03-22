const { createMockLike } = require('../utils/mockData');
const { asyncQuery } = require('./database');
const mysql = require('mysql');

const likes = [createMockLike(1), createMockLike(2), createMockLike(3)];

const createLike = (idPost, emoji) => {
  const id = likes.length + 1;
  const like = { id, idPost, emoji };
  likes.push(like);
  return like;
};

const getLike = async (idPost, idUser) => {
  let sql;
  if (idUser) {
    sql = mysql.format('SELECT * FROM Likes WHERE id_post = ? AND id_user = ?', [idPost, idUser]);
  } else {
    sql = mysql.format('SELECT * FROM Likes WHERE id_post = ?', [idPost]);
  }
  return asyncQuery(sql);
};

const updateLike = (id, emoji) => {
  const like = likes.find(like => like.id === id);
  if (!like) return null;
  like.emoji = emoji;
  return like;
};

const deleteLike = id => {
  like = likes.filter(like => like.id !== id);
};

module.exports = { createLike, getLike, updateLike, deleteLike };
