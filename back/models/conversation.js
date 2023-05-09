const { asyncQuery } = require('./database');
const mysql = require('mysql2');

const { createMessage } = require('./message');
/**
 * create a notification in db
 * @param {Number} userId
 */
const getConversations = async user => {
  let sql;
  if (typeof user !== 'undefined') {
    // sql = mysql.format('SELECT DISTINCT id_conv ' + 'FROM ConversationsUser ' +  'WHERE id_user = ?;', [user]);
    sql = mysql.format(
      'SELECT M.id_conv, M.content, DATE_FORMAT(M.date, "%d:%H %d/%m/%Y") AS date, C.title ' +
        'FROM ConversationsMessages AS M ' +
        'INNER JOIN ( ' +
        'SELECT id_conv, MAX(date) AS last_message_date ' +
        'FROM ConversationsMessages ' +
        'WHERE id_conv IN ( ' +
        'SELECT DISTINCT id_conv ' +
        'FROM ConversationsUser ' +
        'WHERE id_user = ? ' +
        ') AND is_deleted = 0 ' +
        'GROUP BY id_conv ' +
        ') AS LM ON M.id_conv = LM.id_conv AND M.date = LM.last_message_date ' +
        'INNER JOIN Conversations AS C ON C.id = M.id_conv ' +
        'WHERE M.is_deleted = 0 ' +
        'ORDER BY M.date DESC;',
      [user]
    );
  }
  return asyncQuery(sql);
};

createConversation = async (user, author, title) => {
  const userId = Number(user);

  const sql1 = mysql.format('INSERT INTO Conversations (title, date_crea) VALUES (?, ?)', [title, new Date()]);
  const res = await asyncQuery(sql1);
  const id = res.insertId;

  const sql2 = mysql.format('INSERT INTO ConversationsUser (id_user, id_conv, join_date) VALUES (?,?,?)', [
    userId,
    id,
    new Date()
  ]);
  await asyncQuery(sql2);

  const sql3 = mysql.format('INSERT INTO ConversationsUser (id_user, id_conv, join_date) VALUES (?,?,?)', [
    Number(author),
    id,
    new Date()
  ]);
  await asyncQuery(sql3);

  createMessage(id, userId, 'Conversation créée');
};

module.exports = { getConversations, createConversation };
