const Label = require('../model/labelModel')

exports.create_a_label = (req, res) => {
    var newLabel = new Label(req.body);

    if (!newLabel.label) {
        res.status(400).send({ error: true, message: "Please provide label" })
    } else {
        Label.createLabel(newLabel, (err, label) => {
            if (err)
                res.send(err)
            res.json(label)
        })
    };
};

exports.list_all_labels = (req, res) => {
    Label.getAllLabel((err, labels) => {
        if (err)
            res.send(err)
        res.send(labels)
    })
};

exports.get_label_by_id = (req, res) => {
    Label.getLabelByID(req.params.labelID, (err, label) => {
        if (err)
            res.send(err)
        res.json(label)
    })
};

exports.update_a_label = (req, res) => {
    Label.updateByID(req.params.labelID, new Label(req.body), function(err, label) {
        if (err)
            res.send(err);
        res.json(label);
    });
};

exports.delete_a_label = (req, res) => {

    Label.remove(req.params.labelID, function(err, label) {
        if (err)
            res.send(err);
        res.json({ message: 'Label successfully deleted' });
    });
};