async function getUsers() {
    let url = 'https://iaie33.herokuapp.com/receipts';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function renderUsers() {
    let users = await getUsers();
    let html = '';
    users.forEach(user => {
        let htmlSegment = `<div class="user">
                            <table>
                                <thead> 
                                    <tr>
                                        <th>ID Documento</th>
                                        <th>ID Cliente</th>
                                        <th>Data</th>
                                        <th>Código Postal</th>
                                        <th>Desconto Financeiro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${user.document_id}</td>
                                        <td>${user.customer_id}</td>
                                        <td>${user.date}</td>
                                        <td>${user.entity_zip_code}</td>
                                        <td>${user.financial_discount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();