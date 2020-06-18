var mysql = require('mysql');
var config = require("../config").datebase;

var connection = mysql.createConnection({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database
})

connection.connect((err) => {
    if (err) throw err;
})

module.exports = connection