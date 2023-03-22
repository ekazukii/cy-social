const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

const asyncQuery = async sql => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

module.exports = { con, asyncQuery };

//
