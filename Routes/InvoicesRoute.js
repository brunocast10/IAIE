const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const controllerInvoices = require('../Controllers/InvoicesController');

// Visualizar PurchaseOrder
router.get('/invoices', function (req, res) {
    controllerInvoices.listInvoices(req, res)
});

module.exports = router;