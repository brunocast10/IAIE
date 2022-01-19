async function loadIntoTable(url, table){
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    const { headers, rows } = await response.json();
    

    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    for (const headerText of headers) {
        const headerElement = document.createElement( "th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appenChild(headerElement);

        for (const row of rows) {
            const rowElement = document.createElement( "td");

            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);
        }

        tableBody.appenChild(rowElement);
    }
}

loadIntoTable("./teste.json", document.querySelector("table"));