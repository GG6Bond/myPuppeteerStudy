// 数据库配置模块

const mysql = require('mysql');


const db = mysql.createPool({
    host: '39.101.122.139',
    user: 'root',
    password: 'aliyun123LPZ',
    database: 'my_db_01'
});

module.exports = db;

