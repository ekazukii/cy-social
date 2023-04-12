const { asyncQuery } = require('./database');
const mysql = require('mysql2');

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

const getUsers = usersId => {
  const sql = mysql.format('SELECT * FROM Users WHERE id in (?)', [usersId]);
  return asyncQuery(sql);
};

const createUser = (username, name, mail, tel, adresse, dateBday, role) => {
  const sql = mysql.format(
    'INSERT INTO Users (username, name, mail, tel, adresse, date_bday, role) VALUES(?, ?, ?, ?, ?, ?, ?)',
    [username, name, mail, tel, adresse, dateBday, role]
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

module.exports = { getUser, createUser, updateUser, deleteUser, getUsers };
