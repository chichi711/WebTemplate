var express = require("express");
var mysql = require('mysql');
var router = express.Router();

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

router.get('/antique', function(req, res, next) {
    res.render('/ABC');
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

