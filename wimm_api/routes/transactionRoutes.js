const express = require("express")
const transactionCtrl = require("../controller/transactionController");
var router = express.Router()


router.route("/")
    .post(transactionCtrl.create_a_transaction);

router.route("/:startDay/:endDay")
    .get(transactionCtrl.get_transactions_in_interval)

router.get("/category/:categoryID", transactionCtrl.get_transactions_in_category)

router.route("/:transactionID")
    .get(transactionCtrl.get_transaction_by_id)
    .put(transactionCtrl.update_a_transaction)
    .delete(transactionCtrl.delete_a_transaction)

module.exports = router