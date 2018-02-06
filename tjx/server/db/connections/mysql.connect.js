const mysql = require('mysql')
    , con = mysql.createConnection({
        host: "172.26.0.4",
        user: "root",
        password: "root",
        database: "tjx_db"
});

module.exports = con;
