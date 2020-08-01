var express = require('express');
var router = express.Router();

var conn = require('../db');

router.get('/', function (req, res, next) {
    conn.query('select * from member', '', function (err, rows) {
        if (err) {
            console.log(JSON.stringify(err));
            return;
        }
        res.render("demo", { body: rows[1] });
    }
    );
});
// app.post("/", function (request, response) {

// 	connection.query(
// 		"insert into news set tName = ?, type = ? begin = ? end = ?", 
// 			[
// 				request.body.title, 
// 				request.body.ymd
// 			]);
// 	response.send("row inserted.");
    
// })
module.exports = router;