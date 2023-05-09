const { asyncQuery } = require('./database');
const mysql = require('mysql2');
const crypto = require('crypto');

const getUser = userId => {
  if (userId) {
    const sql = mysql.format(
      'SELECT *, (SELECT COUNT(*) FROM `Followers` WHERE id_user = ?) as nbFollowers, (SELECT COUNT(*) FROM `Followers` WHERE id_follower = ?) as nbFollows, (SELECT COUNT(*) FROM `Posts` WHERE id_user = ?) as nbPosts, (SELECT COUNT(*) FROM `UsersGroups` u INNER JOIN `Groups` g ON(id_user = ? AND g.id = u.id_group)) as nbGroups FROM `Users` WHERE id = ?',
      [userId, userId, userId, userId, userId]
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

const updateUser = (id, username, name, mail, tel, adresse, dateBday, role, password, img) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  const hashedPassword = hash.digest('hex');

  const sql = mysql.format(
    'UPDATE Users SET username = ?, name = ?, mail = ?, tel = ?, adresse = ?, date_bday = ?, role = ?, passwd = ?, profile_pic = ? WHERE id = ?',
    [username, name, mail, tel, adresse, dateBday, role, hashedPassword, img, id]
  );

  return asyncQuery(sql);
};

const deleteUser = id => {
  const sql = mysql.format('DELETE FROM Users WHERE id = ?', [id]);
  return asyncQuery(sql);
};

const getFollowers = async userId => {
  const sql = mysql.format(
    'SELECT u.*, (SELECT COUNT(*) FROM `Followers` WHERE id_user = u.id) as nbFollowers, (SELECT COUNT(*) FROM `Followers` WHERE id_follower = u.id) as nbFollows, (SELECT COUNT(*) FROM `Posts` WHERE id_user = u.id) as nbPosts FROM `Followers` f INNER JOIN `Users` u ON(f.id_user = u.id) WHERE f.id_follower = ?',
    [userId]
  );
  const followers = await asyncQuery(sql);
  return followers;
};

const getFollowing = async userId => {
  const sql = mysql.format(
    'SELECT u.*, (SELECT COUNT(*) FROM `Followers` WHERE id_user = u.id) as nbFollowers, (SELECT COUNT(*) FROM `Followers` WHERE id_user = u.id) as nbFollows, (SELECT COUNT(*) FROM `Posts` WHERE id_user = u.id) as nbPosts FROM `Followers` f INNER JOIN `Users` u ON(f.id_follower = u.id) WHERE f.id_user = ?',
    [userId]
  );
  const following = await asyncQuery(sql);
  return following;
};

const createFollow = (id_user, id_follower) => {
  const sql = mysql.format('INSERT INTO Followers (id_user, id_follower, date) VALUES(?, ?, ?)', [id_user, id_follower, new Date()]);
  return asyncQuery(sql);
};

const supprFollow = (id_user, id_follower) => {
  const sql = mysql.format('DELETE FROM `Followers` WHERE id_user = ? AND id_follower = ?', [id_user, id_follower]);
  return asyncQuery(sql);
}

module.exports = {
  getUser,
  getUsersInGroup,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  createFollow,
  supprFollow,
  getFollowers,
  getFollowing,
  getUserByUsername,
};
