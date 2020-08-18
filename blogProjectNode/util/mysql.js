var mysql = require('mysql')
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'031648',
    database:'blogProject',
    port:'3306'
})

module.exports = connection