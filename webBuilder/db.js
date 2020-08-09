// 連線資料庫
var mysql = require("mysql");
var conn = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'eeweb'
});

conn.connect(function (err,res,fields) {
 if (err) {
  console.log(JSON.stringify(err));
 }
})
// 導出模組
module.exports = conn