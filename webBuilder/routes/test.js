var express = require("express");
var mysql = require('mysql');
var app = express();
app.listen(80);

var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'eeweb'
});

conn.connect(function (err) {
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
});

app.get("/home/news", function (request, response) {
    conn.query('select * from member',
        '',
        function (err, rows) {
            if (err) {
                console.log(JSON.stringify(err));
                return;
            }
            response.send(JSON.stringify(rows));
        }
    );
})
// module.exports = router;

