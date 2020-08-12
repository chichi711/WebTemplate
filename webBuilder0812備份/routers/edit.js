var express = require('express');
var router = express.Router();
var conn = require('../db');

router.get('/:type/:template', function (req, res, next) {
    conn.query('select tpID,begin,end,pages,tpName,body from template t join tpages tp on t.tId = tp.tID where tName = ?',
        [req.params.template],
        function (err, rows) {
            if (err) throw err;
            req.session.begin = rows[0].begin;
            req.session.end = rows[0].end;
            //   console.log(rows);
            res.render('webBuilder', { type: req.params.type, template: req.params.template, rows: rows });
        });
});

router.post('/pic', function (request, response) {
    console.log(request.body.img.length);
    conn.query('update account set pic = ? WHERE aID = ( select max(aID) FROM account)',
        [
            request.body.img
        ]);
});

router.post("/demo", function (request, response) {
    request.session.body = request.body[2];
    let num;
    conn.query("insert into account set mID = 1, tID = 1,aName = ?, explanation = ?",
        [
            request.body[0].name,
            request.body[1].explanation
        ]);

    conn.query('select aID from account order by aID desc limit 1',
        '',
        function (err, rows) {
            if (err) {
                console.log(JSON.stringify(err));
                return;
            }
            str = JSON.stringify(rows);
            num = JSON.parse(str)[0].aID;
            request.session.aid = JSON.parse(str)[0].aID;
            request.body[2].forEach(element => {
                conn.query(
                    "insert into pages set aID = ?, pName = ?, body = ?",
                    [
                        num,
                        element.name,
                        element.body,
                    ]);
            });
        }
    );
    response.sendStatus(200);
});



router.get("/demo", function (request, response) {
    response.render("demo", { body: request.session.body, begin: request.session.begin, end: request.session.end });
});
module.exports = router;