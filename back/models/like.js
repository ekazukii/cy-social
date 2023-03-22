const { createMockLike } = require('../utils/mockData');
const { asyncQuery } = require('./database');
const mysql = require('mysql');

const likes = [createMockLike(1), createMockLike(2), createMockLike(3)];

const createLike = (idPost, idUser, emoji) => {
  const sql = mysql.format('INSERT INTO Likes (id_post, id_user, emojis) VALUES(?, ?, ?', [idPost, idUser, emoji]);
  return asyncQuery(sql);
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

const updateLike = (idPost, idUser, emoji) => {
  const sql = mysql.format('UPDATE Likes SET emojis = ? WHERE id_post = ? AND id_user = ?', [emoji, idPost, idUser]);
  return asyncQuery(sql);
};

const deleteLike = id => {
  const sql = mysql.format('DELETE Likes WHERE id = ?', [id]);
  return asyncQuery(sql);
};

module.exports = { createLike, getLike, updateLike, deleteLike };
