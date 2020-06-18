const Category = require('../model/categoryModel')

exports.create_a_category = (req, res) => {
    var newCategory = new Category(req.body);

    if (!newCategory.label) {
        res.status(400).send({ error: true, message: "Please provide label" })
    } else {
        Category.createCategory(newCategory, (err, category) => {
            if (err)
                res.send(err)
            res.json(category)
        })
    };
};

exports.list_all_categories = (req, res) => {
    Category.getAllCategory((err, categories) => {
        if (err)
            res.send(err)
        res.send(categories)
    })
};

exports.get_category_by_id = (req, res) => {
    Category.getCategoryByID(req.params.categoryID, (err, category) => {
        if (err)
            res.send(err)
        res.json(category)
    })
};

exports.update_a_category = (req, res) => {
    Category.updateByID(req.params.categoryID, new Category(req.body), function(err, category) {
        if (err)
            res.send(err);
        res.json(category);
    });
};

exports.delete_a_category = (req, res) => {

    Category.remove(req.params.categoryID, function(err, category) {
        if (err)
            res.send(err);
        res.json({ message: 'Category successfully deleted' });
    });
};