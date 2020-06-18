const sql = require("./db")

module.exports = (type, msg, callback) => {
    sql.query("INSERT INTO logs set ?", { type: type, msg: msg }, (err, res) => { if (err) console.log(err);
        callback })
}