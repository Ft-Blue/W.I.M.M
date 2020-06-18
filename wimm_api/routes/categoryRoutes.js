const express = require("express")
const categoryCtrl = require("../controller/categoryController");
var router = express.Router()


router.route("/")
    .get(categoryCtrl.list_all_categories)
    .post(categoryCtrl.create_a_category);

router.route("/:categoryID")
    .get(categoryCtrl.get_category_by_id)
    .put(categoryCtrl.update_a_category)
    .delete(categoryCtrl.delete_a_category)

module.exports = router