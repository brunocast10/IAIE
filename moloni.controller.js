const querystring = require('querystring');
const req = require('request');
const connect = require('./../config/dbConnection');





function retornar() {
    // getToken((res) => {
    //     console.log(res.access_token);
    //     })
    // getCompany((res) => {
    //         console.log(res);
    //     })
    // getProducts((res) => {
    //              console.log(res);
    //     })
    getCategory((res) => {
            console.log(res);
         })
    // getProducts((res) => {
    //     console.log(res.body);
    // })
    // getPurchases((res) => {
    //     console.log(res);
    //  })
    // getNextNumber((res) => {
    //     console.log(res);
    // // // // //  })
    // insertClient("293820317", "CLIENTPOSTMAN", "nada");
    // getCustomers((res) => {
    //     console.log(res);
    // })
    // getByName((res) => {
    //     console.log(res);
    // })
    // getPaymentID((res) => {
    //     console.log(res);
    // })
    


}

function getPDFLink(document_id, callback) {
    getCompany((res) => {
        if (res.company_id) {
            const company_id = res.company_id;
            const access_token = res.access_token;

            let json = querystring.stringify({
                company_id: 181093,
                document_id: document_id
            });
            let options = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/documents/getPDFLink/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    const a = JSON.parse(res.body)
                    callback({
                        'statusCode': res.statusCode,
                        'body': a.url
                    });
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });

        }
    })
}


function getByName(request, response) {
    const name = request;
    getNextNumber((res) => {
        if (res.company_id) {

            let company_id = res.company_id;
            let  access_token = res.access_token;
            let json = querystring.stringify({
                company_id: company_id,
                name: name
            });
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/sandbox/customers/getAll/?access_token=ebad8a2f312836ad8a1b36967385586868894af0`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    const costumer_id = JSON.parse(result.body);
                    console.log(costumer_id[0].customer_id);
                    response({
                        'customer_id': costumer_id[0].customer_id,
                        'access_token': access_token,
                    })
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}

// Function to define innerHTML for HTML table
function show(costumer_id) {
    let tab = 
        `<tr>
          <th>ID</th>
          <th>Nome</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of costumer_id[0].customer_id.list) {
        tab += `<tr> 
    <td>${r.company_id} </td>
    <td>${r.name}</td>        
</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("clientes").innerHTML = tab;
}




function getNextNumber(callback) {
    getCompany((res) => {
        if (res.company_id) {
            const company_id = res.company_id;
            const access_token = res.access_token;

            const json = querystring.stringify({
                company_id: company_id
            })
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/customers/getNextNumber/?access_token=${access_token}`,
                body: json
            }

            req.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    callback({
                        'company_id': company_id,
                        'access_token': access_token,
                        'next_number': JSON.parse(res.body).number
                    });
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        }
    })
}

function getPurchases(customer_id, callback) {
    getCompany((res) => {
        if (res.company_id) {
            const company_id = res.company_id;
            const access_token = res.access_token;

            let json = querystring.stringify({
                company_id: company_id,
                qty: 0,
                offset: 0,
                customer_id: customer_id,
                supplier_id: 0,
                salesman_id: 0,
                document_set_id: 0,
                number: 0,
                date: '',
                expiration_date: '',
                year: 0,
                your_reference: '',
                our_reference: ''
            });

            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/invoiceReceipts/getAll/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    let invoices = JSON.parse(res.body);
                    console.log(invoices);
                    let invoicesF = [];
                    for (let i = 0; i < invoices.length; i++) {
                        if (invoices[i].status == 1) {
                            invoicesF.push(invoices[i]);
                        }
                    }

                    callback({
                        'statusCode': res.statusCode,
                        'body': invoicesF
                    });
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });

        }
    })
}

function getCustomers(callback) {
    getCategory((res) => {
        if (res.category_id) {
            const access_token = res.access_token;
            const company_id = res.company_id;
            const category_id = res.category_id;

            let json = querystring.stringify({
                company_id: company_id,
            });
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/customers/getAll/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    let resp = JSON.parse(res.body);
                    console.log(resp);
                    callback({
                        'customers': resp,
                        'company_id': company_id,
                        // 'customer_id': customer_id,
                        'access_token': access_token
                    });
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });
        }
    })
}

function getPaymentID(callback) {
    getCategory((res) => {
        if (res.category_id) {
            const access_token = res.access_token;
            const company_id = res.company_id;
            const category_id = res.category_id;

            let json = querystring.stringify({
                company_id: company_id,
            });
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/paymentMethods/getAll/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    let resp = JSON.parse(res.body);
                    console.log(resp);
                    callback({
                        'paymentID': resp,
                        'company_id': company_id,
                        // 'customer_id': customer_id,
                        'access_token': access_token
                    });
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });
        }
    })
}


function getProducts(callback) {
    getCategory((res) => {
        if (res.category_id) {
            const access_token = res.access_token;
            const company_id = res.company_id;
            const category_id = 3802953;
            let json = querystring.stringify({
                company_id: company_id,
                category_id: category_id,
                qty: 0,
                offset: 0,
                with_invisible: 0
            });
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/products/getAll/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    let resp = JSON.parse(res.body);
                    console.log(resp.length);
                    let produtos = []
                    for(let i = 0; i<resp.length;i++){
                        produtos.push({
                            name:resp[i].name,
                            dataCriacao:resp[i].created
                        })

                        if(produtos.length == resp.length){
                            callback({
                                'statusCode':res.statusCode,
                                'body':produtos
                            })
                        }
                    }

                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });
        }
    })
}

function getCategory(callback) {
    getCompany((res) => {
        if (res.company_id) {
            let access_token = res.access_token;
            let company_id = res.company_id;
            let nameC;
            let json = querystring.stringify({
                company_id: company_id,
                parent_id: 0
            });
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/productCategories/getAll/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    let resBody = JSON.parse(res.body);
                    let category_id = -1;
                    for (let i = 0; i < resBody.length; i++) {
                        if (resBody[i].name == 'Transporte') {
                            category_id = resBody[i].category_id,
                                nameC = resBody[i].name
                            // console.log(category_id);
                        }
                    }
                    callback({
                        'company_id': company_id,
                        'access_token': access_token,
                        'category_id': category_id,
                        'name': nameC
                    });
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });
        }
    })
}

function getCompany(callback) {
    getToken((res) => {
        if (res.access_token) {
            const access_token = res.access_token;
            let options = {
                url: `https://api.moloni.pt/v1/companies/getAll/?access_token=${access_token}`
            }
            req.get(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    let resBody = JSON.parse(res.body);
                    let company_id = -1;
                    for (let i = 0; i < resBody.length; i++) {
                        if (resBody[i].email == process.env.EMAIL_USERNAME) {
                            company_id = resBody[i].company_id;
                        }
                    }
                    if (company_id != -1) {
                        callback({
                            'company_id': company_id,
                            'access_token': access_token
                        });
                    } else {
                        callback({
                            'statusCode': 404,
                            'body': {
                                'message': 'Company not found'
                            }
                        });
                    }
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });
        }
    })
}

function getToken(callback) {
    let options = {
        url: `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=Grupo202&client_secret=aa80b95ea20210569cec0dacc2a533bf29b8e314&username=a93085@alunos.uminho.pt&password=Grupo202!IAIE`
    }
    req.get(options, (err, res) => {
        console.log(res.body);
        if (!err && res.statusCode == 200) {
            callback({
                'access_token': JSON.parse(res.body).access_token
            });
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': JSON.parse(res.body)
            });
        }
    })
}

module.exports = {
    getToken: getToken,
    retornar: retornar,
    getProducts: getProducts,
    getCompany: getCompany,
    getCategory: getCategory,
    getPurchases: getPurchases,
    insertInvoice: insertInvoice,
    getPDFLink: getPDFLink,
    getByName: getByName
};



async function loadIntoTable(url, table){
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const responde = await fetch(url);
    const data = await response.json();
    

    console.log(data);
}

loadIntoTable("https://api.moloni.pt/sandbox/customers/getAll/?access_token=7bfac3a20169a5037d1b8a8b2c494ad00a5de91e", document.querySelector("table"));