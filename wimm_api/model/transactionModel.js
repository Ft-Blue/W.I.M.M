const sql = require("./db");
const log = require("./logging")


var Transaction = function(transaction) {
    this.label_id = transaction.label_id
    this.date = transaction.date
    this.amount = transaction.amount
};

Transaction.createTransaction = (newTransaction, result) => {
    sql.query("INSERT INTO transactions set ?", newTransaction, (err, res) => {

        if (err) {
            log("ERROR", err.toString(), result(err, null))
        } else {
            log("INFO", "New transaction added: " + res.insertId, result(null, res.insertId))
        }
    });
};

Transaction.updateByID = (id, transaction, result) => {
    sql.query("UPDATE transactions SET ? WHERE ID = ?", [transaction, id], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

Transaction.remove = (id, result) => {
    sql.query("DELETE FROM transactions WHERE ID = ?", [id], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            log("INFO", "Transaction Deleted")
            result(null, res)
        }
    });
};

Transaction.getTransactionByID = (id, result) => {
    sql.query("SELECT * FROM transactions WHERE ID = ?", [id], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

Transaction.getTransactionByCategory = (categoryID, result) => {
    sql.query("SELECT ID FROM labels WHERE category_id=?", [categoryID], (err_label, res_label) => {

        if (err_label) {
            log("ERROR", err_label.toString(), result(err_label, null))
        } else {
            var labels = res_label.map((e) => e.ID)
            sql.query("SELECT * FROM transactions WHERE ID IN (?)", [labels], (err_trs, res_trs) => {

                if (err_trs) {
                    log("ERROR", err_trs.toString(), result(err_trs, null))
                } else {
                    result(null, res_trs)
                }
            });
        }


    });
};

Transaction.getAllTransaction = (result) => {
    sql.query("SELECT * FROM transactions", (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};

Transaction.getTransactionInInterval = (startDay, endDay, result) => {
    if (!endDay || !startDay) {
        var endDay = new Date();
        var dd = endDay.getDate();
        var mm = endDay.getMonth() + 1;
        var yyyy = endDay.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (!endDay) {
            endDay = yyyy + '-' + mm + '-' + dd;
        }
        if (!startDay) {
            yyyy = "0001";
            startDay = yyyy + '-' + mm + '-' + dd;
        }
    }

    sql.query("SELECT * FROM transactions WHERE date >= ? AND date <= ?", [startDay, endDay], (err, res) => {

        if (err) {
            log("ERROR", err.toString())
            result(err, null)
        } else {
            result(null, res)
        }
    });
};


module.exports = Transaction