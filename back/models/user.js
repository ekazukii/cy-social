const { asyncQuery } = require('./database');
const mysql = require('mysql2');

const getUser = userId => {
  if (typeof userId === 'number') {
    const sql = mysql.format('SELECT * FROM Users WHERE id = ?', [userId]);
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
