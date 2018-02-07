var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'test'
});

connection.connect(function(err) {
    if (err) throw err;
    else
        console.log('database is connected');
});

module.exports = connection;