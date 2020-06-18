const sql = require("./db");
const log = require("./logging")


var Label = function(label) {
    this.label = label.label
    this.category_id = (label.category_id) ? label.category_id : -1
};

Label.createLabel = (newLabel, result) => {
    sql.query("INSERT INTO labels set ?", newLabel, (err, res) => {

        if (err) {
            log("ERROR", err.toString(), result(err, null))
        } else {
            log("INFO", "New label added: " + res.insertId, result(null, res.insertId))
        }
    });
};

Label.updateByID = (id, label, result) => {
    sql.query("UPDATE labels SET ? WHERE ID = ?", [label, id], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

Label.remove = (id, result) => {
    sql.query("DELETE FROM labels WHERE ID = ?", [id], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            log("INFO", "Label Deleted")
            result(null, res)
        }
    });
};

Label.getLabelByID = (id, result) => {
    sql.query("SELECT * FROM labels WHERE ID = ?", [id], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

Label.getAllLabel = (result) => {
    sql.query("SELECT * FROM labels", (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

module.exports = Label