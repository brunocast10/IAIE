var access_token = "474a54733de593db8baffe5b95b5b24f7e465e7c";
var link = `https://api.moloni.pt/v1/purchaseOrder/getAll/?access_token=${access_token}`;
const request = require('request');

//tabelaFornecedores.getHttpObject("cd_catalog.js", myFunction);
function getAll(req, res) {
    request.post({
        url: link,
        form: {
            company_id: '205207',
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
    //myObject.total = total.toFixed(2);
    //tabelaFornecedores.displayObject("id01", myObject);
}

module.exports = {
    listPurchases: getAll
};