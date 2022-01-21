var access_token = "9334c5c2033c3e06e86c28f5b0e9a29113c3ca4b";
var link = `https://api.moloni.pt/v1/invoices/getAll/?access_token=${access_token}`;

const request = require ('request');
request.post({
    url: link,
    form: {
        company_id: '205205',
    }
}, function (err, httpResponse, body) {
    data = JSON.parse(body);
    console.log(data);
    return data;
})
