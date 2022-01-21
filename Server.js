const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    next();
});


const purchaseRoutes = require('./Routes/PurchaseRoute');
const invoicesRoutes = require('./Routes/InvoicesRoute');
const receiptsRoutes = require('./Routes/ReceiptsRoute');



//Criação de rotas estáticas
app.use('./assets', express.static ('assets'));
app.use('./views', express.static ('views'));

app.use('/', purchaseRoutes);
app.use('/', invoicesRoutes);
app.use('/', receiptsRoutes);


// Server connection
app.listen(port, (err) => {
    if (!err) {
        console.log(`Server runing at http://${host}:${port}`);
    } else console.log(err);
});

module.exports = app;
