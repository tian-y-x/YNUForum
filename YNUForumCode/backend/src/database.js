const mysql2 = require("mysql2");

function getDBConfig(){
    return {
        host: 'localhost',
        user: 'root',
        password: '3141',
        port: '3306',
        database: 'database1'
    }

}
function db() {
    this.config = function(){
        const config = getDBConfig()
        return mysql2.createPool(config).promise()
    }

}
module.exports = db