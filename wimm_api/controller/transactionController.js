const Transaction = require('../model/transactionModel')

exports.create_a_transaction = (req, res) => {
    var newTransaction = new Transaction(req.body);

    if (!newTransaction.label_id || !newTransaction.date || !newTransaction.amount) {
        res.status(400).send({ error: true, message: "Please provide label/date/amount" })
    } else {
        Transaction.createTransaction(newTransaction, (err, transaction) => {
            if (err)
                res.send(err)
            res.json(transaction)
        })
    };
};

exports.list_all_transactions = (req, res) => {
    Transaction.getAllTransaction((err, transactions) => {
        if (err)
            res.send(err)
        res.send(transactions)
    })
};

exports.get_transaction_by_id = (req, res) => {
    Transaction.getTransactionByID(req.params.transactionID, (err, transaction) => {
        if (err)
            res.send(err)
        res.json(transaction)
    })
};

exports.update_a_transaction = (req, res) => {
    Transaction.updateByID(req.params.transactionID, new Transaction(req.body), function(err, transaction) {
        if (err)
            res.send(err);
        res.json(transaction);
    });
};

exports.delete_a_transaction = (req, res) => {

    Transaction.remove(req.params.transactionID, function(err, transaction) {
        if (err)
            res.send(err);
        res.json({ message: 'Transaction successfully deleted' });
    });
};

exports.get_transactions_in_interval = (req, res) => {
    Transaction.getTransactionInInterval(req.params.startDay, req.params.endDay, (err, transactions) => {
        if (err)
            res.send(err);
        res.send(transactions)
    });
}

exports.get_transactions_in_category = (req, res) => {
    Transaction.getTransactionByCategory(req.params.categoryID, (err, transactions) => {
        if (err)
            res.send(err);
        res.send(transactions)
    });
}