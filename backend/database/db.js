const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'groupomania'
  });

  connection.connect();

  module.exports = connection;