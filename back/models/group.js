const { asyncQuery } = require('./database');
const mysql = require('mysql2');

const createGroup = async (name, isPrivate, img, description) => {
  const sql = mysql.format(
    'INSERT INTO Groups (name, is_private, date_crea, img, description, post_pinned) VALUES (?, ?, ?, ?, ?, ?)',
    [name, isPrivate, new Date(), img, description, null]
  );

  return asyncQuery(sql);
};

const deleteGroup = async id => {
  const sql = mysql.format('DELETE FROM Groups WHERE id = ?', [id]);
  return asyncQuery(sql);
};

const updateGroup = (id, name, isPrivate, img, description, postPinId) => {
  const sql = mysql.format(
    'UPDATE Groups SET name = ?, is_private = ?, img = ?, description = ?, post_pinned = ? WHERE id = ?',
    [name, isPrivate, img, description, postPinId, id]
  );

  return asyncQuery(sql);
};

const getGroup = groupId => {
  if (typeof groupId === 'number') {
    return asyncQuery(mysql.format('SELECT * FROM Groups WHERE id = ?', [groupId]));
  }
  const sql = mysql.format('SELECT * FROM Groups');
  return asyncQuery(sql);
};

module.exports = { createGroup, deleteGroup, updateGroup, getGroup };
