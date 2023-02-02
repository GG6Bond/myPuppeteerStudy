const db = require('./dbconfig.js');


let nameStr = '清华';
let str = `SELECT id,workName FROM work WHERE workName LIKE "%${nameStr}%"`;

console.log(str);

db.query(str, (err, results) => {
    if (err) {
        return console.log(err.message);
    }
    console.log(results);

    results.forEach(element => {
        console.log(element.id + "---" + element.workName);
    });
})

module.exports = nameStr;
module.exports = db.query();



