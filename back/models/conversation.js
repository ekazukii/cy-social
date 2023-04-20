const { asyncQuery } = require('./database');
const mysql = require('mysql2');
/**
 * create a notification in db
 * @param {Number} userId
 */
const getConversations = async (user) => {
  let sql;
  if (typeof user !== 'undefined') {
    // sql = mysql.format('SELECT DISTINCT id_conv ' + 'FROM conversationsuser ' +  'WHERE id_user = ?;', [user]);
    sql = mysql.format('SELECT M.id_conv, M.content, DATE_FORMAT(M.date, "%d:%H %d/%m/%Y") AS date, C.title ' + 
                        'FROM conversationsmessages AS M ' +
                        'INNER JOIN ( ' +
                            'SELECT id_conv, MAX(date) AS last_message_date ' + 
                            'FROM conversationsmessages ' + 
                            'WHERE id_conv IN ( ' + 
                                'SELECT DISTINCT id_conv ' + 
                                'FROM conversationsuser ' +
                                'WHERE id_user = ? ' + 
                            ') AND is_deleted = 0 ' + 
                            'GROUP BY id_conv ' +
                        ') AS LM ON M.id_conv = LM.id_conv AND M.date = LM.last_message_date ' +
                        'INNER JOIN conversations AS C ON C.id = M.id_conv ' +
                        'WHERE M.is_deleted = 0 ' + 
                        'ORDER BY M.date DESC;',
                        [user]
                    );
  }
  return asyncQuery(sql);
};

module.exports = { getConversations };
