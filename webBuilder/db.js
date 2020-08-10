// 連線資料庫
var mysql = require("mysql");
var conn = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'eeweb'
});

conn.connect(function (err,rows) {
 if (err) {
  console.log(JSON.stringify(err));
  return;
 }
});
// 導出模組
module.exports = conn