const express = require('express'),
    bodyParser = require("body-parser"),
    cors = require('cors'),
    app = express(),

    port = process.env.PORT || 3000;


var transactionRoutes = require("./routes/transactionRoutes"),
    categoryRoutes = require("./routes/categoryRoutes"),
    labelRoutes = require("./routes/labelRoutes")

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/transactions', transactionRoutes)
app.use('/categories', categoryRoutes)
app.use('/labels', labelRoutes)


app.listen(3000, function() {
    console.log('Example app listening on port ' + port)
})