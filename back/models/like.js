const { createMockLike } = require('../utils/mockData');
const { asyncQuery } = require('./database');
const mysql = require('mysql2');

const likes = [createMockLike(1), createMockLike(2), createMockLike(3)];

const createLike = (idPost, idUser, emoji) => {
  const sql = mysql.format('INSERT INTO Likes (id_post, id_user, emojis) VALUES(?, ?, ?)', [idPost, idUser, emoji]);
  return asyncQuery(sql);
};

const getLike = async (idPost, idUser) => {
  let sql;

  if (idUser) {
    if (idPost) {
      sql = mysql.format('SELECT * FROM Likes WHERE id_post = ? AND id_user = ?', [idPost, idUser]);
    } else {
      sql = mysql.format('SELECT * FROM Likes l INNER JOIN Posts p ON (l.id_user = ? AND p.id = l.id_post)', [idUser]);
    }
  } else {
    sql = mysql.format('SELECT * FROM Likes l INNER JOIN Users u ON id_post = ? AND l.id_user = u.id', [idPost]);
  }
  return asyncQuery(sql);
};

const updateLike = (idPost, idUser, emoji) => {
  const sql = mysql.format('UPDATE Likes SET emojis = ? WHERE id_post = ? AND id_user = ?', [emoji, idPost, idUser]);
  return asyncQuery(sql);
};

const deleteLike = (idPost, idUser) => {
  const sql = mysql.format('DELETE FROM Likes WHERE id_post = ? AND id_user = ?', [idPost, idUser]);
  return asyncQuery(sql);
};

module.exports = { createLike, getLike, updateLike, deleteLike };
