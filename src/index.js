document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/dogs")
    .then((responce) => responce.json())
    .then((dogs) => dogs.forEach(renderDogs));
});

function renderDogs(dogs) {
  let tabelBody = document.getElementById("table-body");
  let tableData = `<tr>
  <td>${dogs.name}</td>
  <td>${dogs.breed}</td>
  <td>${dogs.sex}</td>
  <td><button class="edit-btn">Edit</button></td>
</tr>`;

  tabelBody.innerHTML += tableData;
}
