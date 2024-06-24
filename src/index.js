document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((data) => data.forEach(renderDogs));
});

function renderDogs(dog) {
  let tableBody = document.getElementById("table-body");
  let tableRow = document.createElement("tr");

  tableRow.innerHTML = `
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button class="edit-btn btn btn-primary" data-id="${dog.id}">Edit</button></td>
    `;

  tableBody.appendChild(tableRow);

  tableRow.querySelector(".edit-btn").addEventListener("click", () => {
    populateForm(dog);
  });
}

function populateForm(dog) {
  const dogForm = document.getElementById("dog-form");
  dogForm.setAttribute("data-id", dog.id);
  dogForm.name.value = dog.name;
  dogForm.breed.value = dog.breed;
  dogForm.sex.value = dog.sex;
}

document
  .getElementById("dog-form")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const dogForm = event.target;
  const dogId = dogForm.getAttribute("data-id");
  const name = dogForm.name.value;
  const breed = dogForm.breed.value;
  const sex = dogForm.sex.value;

  const updatedDog = { name, breed, sex };

  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDog),
  });
}
