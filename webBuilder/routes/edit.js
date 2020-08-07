var express = require('express');
var router = express.Router();

var conn = require('../db');


router.get('/', function (req, res, next) {
    res.render('webBuilder');
});
router.get('/ee', function (req, res, next) {
    res.render('eedit');
});

router.get('/pic', function (request, response) {
    conn.query('select pic from account where aID = 52',
        '',
        function (err, rows) {
            if (err) {
                console.log(JSON.stringify(err));
                return;
            }
            console.log('get');
            var a = { pic: rows };
            console.log(a.pic[0].pic);
            response.render("pic", { pic: rows });
        });

});

router.post('/pic', function (request, response) {
    // console.log('post');
    console.log(request.body.img.length);
    conn.query('update account set pic = ? WHERE aID = ( select max(aID) FROM account)',
        [
            request.body.img
        ]);
        console.log('11111');
    // response.status(200).end();
});


router.get("/demo", function (request, response) {
    conn.query('SELECT pName,body,p.aID,t.tID,t.begin,t.end FROM ( (account a join template t on a.tID=t.tID) join pages p on a.aID=p.aID ) where p.aID = ( select max(aID) FROM pages)',
        '',
        function (err, rows) {
            if (err) {
                console.log(JSON.stringify(err));
                return;
            }
            response.render("demo", { body: rows });
        }
    );
});

router.post("/demo", function (request, response) {
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
            console.log('row : ', JSON.parse(str)[0].aID);
            num = JSON.parse(str)[0].aID;
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
});

module.exports = router;