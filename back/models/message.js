const { asyncQuery } = require('./database');
const mysql = require('mysql2');

const getMessages = async (conv) => {
  let sql;
  if (typeof conv !== 'undefined') {
  sql = mysql.format('SELECT conversationsmessages.id, conversationsmessages.content, conversationsmessages.date, conversationsmessages.id_user ' + 
                     'FROM conversationsmessages ' + 
                     'JOIN conversations ON conversationsmessages.id_conv = conversations.id ' + 
                     'WHERE conversations.id = ? ' + 
                     'AND conversationsmessages.is_deleted  = 0 ' +
                     'ORDER BY conversationsmessages.date ASC;',
                     [conv]
                    );
  }                  
  return asyncQuery(sql);
};

module.exports = { getMessages };
