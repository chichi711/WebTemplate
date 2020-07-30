var express = require('express');
var router = express.Router();

var conn = require('../db');

router.get('/', function (req, res, next) {
    conn.query('select * from member', '', function (err, rows) {
        if (err) {
            console.log(JSON.stringify(err));
            return;
        }
        res.render("demo", { body: rows[0] });
    }
    );
});

module.exports = router;