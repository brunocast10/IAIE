var access_token = "037c87d24124513296043fe0fdb91c025cce119f";
var link = `https://api.moloni.pt/v1/purchaseOrder/getAll/?access_token=${access_token}`;
const request = require('request');

function getAll(req, res) {
    request.post({
        url: link,
        form: {
            company_id: '205205',
        }
    }, function (err, httpResponse, body) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        else {
            data = JSON.parse(body);
            return res.json(data);
        }
    });
    let container = document.querySelector('.container');
    container.innerHTML = html;
}

module.exports = {
    listPurchases: getAll
};