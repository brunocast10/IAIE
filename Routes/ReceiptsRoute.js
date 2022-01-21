const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const controllerReceipts = require('../Controllers/ReceiptsController');

// Visualizar PurchaseOrder
router.get('/receipts', function (req, res) {
    controllerReceipts.listReceipts(req, res)
});

module.exports = router;