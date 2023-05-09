const { asyncQuery } = require('./database');
const mysql = require('mysql2');
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
  if (userId && postId){
    sql = mysql.format('SELECT * FROM Votes v INNER JOIN Posts p ON (v.id_user = ? AND v.id_post = p.id) WHERE v.id_post = ?', 
                       [userId,postId] );
  } else if (userId) {
    sql = mysql.format('SELECT * FROM Votes v INNER JOIN Posts p ON (v.id_user = ? AND v.id_post = p.id)', [userId]);
  } else {
    sql = mysql.format('SELECT * FROM Votes v INNER JOIN Users u ON v.id_post = ? AND v.id_user = u.id', [postId]);
  }
  return asyncQuery(sql);
};

const updateVote = (id_post, id_user, vote) => {
  const sql = mysql.format('UPDATE Votes SET vote = ? WHERE id_post = ? AND id_user = ?', [vote, id_post, id_user]);
  return asyncQuery(sql);
};

const createVote = (postId, userId, vote) => {
  const sql = mysql.format('INSERT INTO Votes (id_post, id_user, vote) VALUES(?, ?, ?)', [postId, userId, vote]);
  return asyncQuery(sql);
};

const deleteVote = (id_post, id_user) => {
  const sql = mysql.format('DELETE FROM Votes WHERE id_post = ? AND id_user = ?', [id_post, id_user]);
  return asyncQuery(sql);
};

module.exports = { createVote, updateVote, deleteVote, getVote };
