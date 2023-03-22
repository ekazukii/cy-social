const { asyncQuery } = require('./database');
const mysql = require('mysql');
const { createMockVote } = require('../utils/mockData');
const _votes = [
  createMockVote(1, 1),
  createMockVote(2, 1),
  createMockVote(3, 2),
  createMockVote(4, 2),
  createMockVote(5, 2)
];

/**
 * create a notification in db
 * @param {Number} userId
 */
const getVote = (postId, userId) => {
  let sql;
  if (userId) {
    sql = mysql.format('SELECT * FROM Votes WHERE id_post = ? AND id_user = ?', [postId, userId]);
  } else {
    sql = mysql.format('SELECT * FROM Votes WHERE id_post = ?', [postId]);
  }
  return asyncQuery(sql);
};

const updateVote = (id, vote) => {
  const sql = mysql.format('UPDATE Votes SET vote = ? WHERE id = ?', [vote, id]);
  return asyncQuery(sql);
};

const createVote = (postId, userId, vote) => {
  const sql = mysql.format('INSERT INTO Votes (id_post, id_user, vote) VALUES(?, ?, ?)', [postId, userId, vote]);
  return asyncQuery(sql);
};

const deleteVote = id => {
  const sql = mysql.format('DELETE Votes WHERE id = ?', [id]);
  return asyncQuery(sql);
};

module.exports = { createVote, updateVote, deleteVote, getVote };
