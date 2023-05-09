const { asyncQuery } = require('./database');
const mysql = require('mysql2');

const getMessages = async (conv) => {
  let sql;
  if (typeof conv !== 'undefined') {
  sql = mysql.format('SELECT ConversationsMessages.id, ConversationsMessages.content, ConversationsMessages.date, ConversationsMessages.id_user ' + 
                     'FROM ConversationsMessages ' + 
                     'JOIN Conversations ON ConversationsMessages.id_conv = Conversations.id ' + 
                     'WHERE Conversations.id = ? ' + 
                     'AND ConversationsMessages.is_deleted  = 0 ' +
                     'ORDER BY ConversationsMessages.date ASC;',
                     [conv]
                    );
  }                  
  return asyncQuery(sql);
};

const createMessage = (id_conv, id_user, content) => {
  const date = new Date();
  const sql = mysql.format(
    'INSERT INTO `ConversationsMessages` (id_conv, id_user, content, date, is_deleted) VALUES (?, ?, ?, ?, ?)',
    [id_conv, id_user, content, date, 0]
  );
  return asyncQuery(sql);
};

module.exports = { getMessages, createMessage };
