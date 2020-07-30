
var mysql = require('mysql');

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

// app.get("/home/news", function (request, response) {
//     conn.query('select * from member',
//         '',
//         function (err, rows) {
//             if (err) {
//                 console.log(JSON.stringify(err));
//                 return;
//             }
//             response.send(JSON.stringify(rows));
//         }
//     );
// })

