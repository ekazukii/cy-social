const { asyncQuery } = require('./database');
const mysql = require('mysql2');
const crypto = require('crypto');

const getUser = userId => {
  if (userId) {
    const sql = mysql.format(
      'SELECT *, (SELECT COUNT(*) FROM `Followers` WHERE id_user = 1) as nbFollowers, (SELECT COUNT(*) FROM `Followers` WHERE id_follower = 1) as nbFollows, (SELECT COUNT(*) FROM `Posts` WHERE id_user = 1) as nbPosts, (SELECT COUNT(*) FROM `UsersGroups` u INNER JOIN `Groups` g ON(id_user = 1 AND g.id = u.id_group)) as nbGroups FROM `Users` WHERE id = ?',
      [userId]
    );
    return asyncQuery(sql);
  }

  return asyncQuery(mysql.format('SELECT * FROM Users'));
};

const getUserByUsername = async username => {
  const sql = mysql.format('SELECT * FROM Users WHERE username = ?', [username]);
  const res = await asyncQuery(sql);
  return res[0];
};

const getUsers = usersId => {
  const sql = mysql.format('SELECT * FROM Users WHERE id in (?)', [usersId]);
  return asyncQuery(sql);
};

const getUsersInGroup = groupId => {
  const sql = mysql.format('SELECT * FROM Users WHERE id IN (SELECT id_user FROM UsersGroups WHERE id_group = ?)', [
    groupId
  ]);
  return asyncQuery(sql);
};

const createUser = (username, name, mail, tel, adresse, dateBday, role, password, img) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  const hashedPassword = hash.digest('hex');

  const sql = mysql.format(
    'INSERT INTO Users (username, name, mail, tel, adresse, date_bday, role, passwd, profile_pic) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [username, name, mail, tel, adresse, dateBday, role, hashedPassword, img]
  );

  return asyncQuery(sql);
};

const updateUser = (id, name, adresse, dateBday, role) => {
  const sql = mysql.format('UPDATE Users SET name = ?, adresse = ?, date_bday = ?, role = ? WHERE id = ?', [
    name,
    adresse,
    dateBday,
    role,
    id
  ]);

  return asyncQuery(sql);
};

const deleteUser = id => {
  const sql = mysql.format('DELETE FROM Users WHERE id = ?', [id]);
  return asyncQuery(sql);
};

const getFollowers = id => {
  const sql = mysql.format('SELECT * FROM Followers f INNER JOIN Users u ON (u.id = f.id_user AND u.id = ?)', [id]);
  return asyncQuery(sql);
};

const getFollowing = id => {
  const sql = mysql.format('SELECT * FROM Followers f INNER JOIN Users u ON (u.id = f.id_follower AND u.id = ?)', [id]);
  return asyncQuery(sql);
};

const createFollow = (id_user, id_follower) => {
  const sql = mysql.format('INSERT INTO Followers (id_user, id_follower) VALUES(?, ?)', [id_user, id_follower]);
  return asyncQuery(sql);
};

module.exports = {
  getUser,
  getUsersInGroup,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  createFollow,
  getFollowers,
  getFollowing,
  getUserByUsername
};
