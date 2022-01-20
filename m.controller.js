function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('authors');
const url = 'http://localhost/dolibarr/api/index.php/contacts?sortfield=t.rowid&sortorder=ASC&limit=100';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let authors = data.results;
  return authors.map(function(author) {
    let li = createNode('li');
    let span = createNode('span');
    span.innerHTML = `${author.firstname} ${author.lastname}`;
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});
