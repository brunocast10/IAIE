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
                            <h2> ${user.document_id}  ${user.customer_id} ${user.date} ${user.entity_zip_code} ${user.financial_discount} </h2>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();