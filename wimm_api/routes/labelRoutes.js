const express = require("express")
const labelCtrl = require("../controller/labelController");
var router = express.Router()


router.route("/")
    .get(labelCtrl.list_all_labels)
    .post(labelCtrl.create_a_label);

router.route("/:labelID")
    .get(labelCtrl.get_label_by_id)
    .put(labelCtrl.update_a_label)
    .delete(labelCtrl.delete_a_label)

module.exports = router