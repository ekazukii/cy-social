const { asyncQuery } = require('./database');
const mysql = require('mysql2');

const createGroup = async (name, isPrivate, img, description) => {
  const sql = mysql.format(
    'INSERT INTO `Groups` (name, is_private, date_crea, img, description, post_pinned) VALUES (?, ?, ?, ?, ?, ?)',
    [name, isPrivate, new Date(), img, description, null]
  );

  return asyncQuery(sql);
};

const deleteGroup = async id => {
  const sql = mysql.format('DELETE FROM `Groups` WHERE id = ?', [id]);
  return asyncQuery(sql);
};

const updateGroup = (id, name, isPrivate, img, description, postPinId) => {
  const sql = mysql.format(
    'UPDATE `Groups` SET name = ?, is_private = ?, img = ?, description = ?, post_pinned = ? WHERE id = ?',
    [name, isPrivate, img, description, postPinId, id]
  );

  return asyncQuery(sql);
};

const getGroup = groupId => {
  if (typeof groupId !== 'undefined') {
    return asyncQuery(
      mysql.format(
        'SELECT *, (SELECT COUNT(*) FROM `Posts` p WHERE p.id_group = g.id) as nbPosts, (SELECT COUNT(*) FROM `UsersGroups` u WHERE u.id_group = g.id) as nbMembers FROM `Groups` g WHERE g.id = ?',
        [groupId]
      )
    );
  }
  const sql = mysql.format(
    'SELECT *, (SELECT COUNT(*) FROM `Posts` p WHERE p.id_group = g.id) as nbPosts, (SELECT COUNT(*) FROM `UsersGroups` u WHERE u.id_group = g.id) as nbMembers FROM `Groups` g'
  );
  return asyncQuery(sql);
};

const getGroupsOf = userId => {
  const sql = mysql.format(
    //'SELECT * FROM `Groups` WHERE id IN (SELECT id_group FROM `UsersGroups` WHERE id_user = ?)',
    'SELECT *, (SELECT COUNT(*) FROM `Posts` p WHERE p.id_group = g.id) as nbPosts, (SELECT COUNT(*) FROM `UsersGroups` u WHERE u.id_group = g.id) as nbMembers FROM `Groups` g WHERE id IN (SELECT id_group FROM `UsersGroups` WHERE id_user = ?)',
    [userId]
  );
  return asyncQuery(sql);
};

module.exports = { createGroup, deleteGroup, updateGroup, getGroup, getGroupsOf };
