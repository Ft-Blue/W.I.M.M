const sql = require("./db");
const log = require("./logging")


var Category = function(category) {
    this.label = category.label
};

Category.createCategory = (newCategory, result) => {
    sql.query("INSERT INTO categories set ?", newCategory, (err, res) => {

        if (err) {
            log("ERROR", err.toString(), result(err, null))
        } else {
            log("INFO", "New category added: " + res.insertId, result(null, res.insertId))
        }
    });
};

Category.updateByID = (id, category, result) => {
    sql.query("UPDATE categories SET ? WHERE ID = ?", [category, id], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

Category.remove = (id, result) => {
    sql.query("DELETE FROM categories WHERE ID = ?", [id], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            log("INFO", "Category Deleted")
            result(null, res)
        }
    });
};

Category.getCategoryByID = (id, result) => {
    sql.query("SELECT * FROM categories WHERE ID = ?", [id], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

Category.getAllCategory = (result) => {
    sql.query("SELECT * FROM categories", (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

module.exports = Category