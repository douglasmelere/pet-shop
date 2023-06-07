const createAnimalTypeButton = document.getElementById('create-animal-button');

createAnimalTypeButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const name = document.querySelector('input[name="animal-name"]').value;
  const breed = document.querySelector('input[name="animal-breed"]').value;
  const age = document.querySelector('input[name="animal-age"]').value;
  const weight = document.querySelector('input[name="animal-weight"]').value;
  const owner_name = document.querySelector('input[name="animal-owner-name"]').value;
  const is_vacinated = document.getElementById('animal-select').value;

  const animals = document.querySelectorAll('tr > td')

  animals.forEach(td => {
    const tr = td.parentNode
    tr.remove()
  })

  await fetch('http://localhost:3000/api/animals', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
     name,
     breed,
     age,
     weight,
     owner_name,
     is_vacinated
    })
  });

  await getAnimalList();
});

async function getAnimalList() {
  console.log('getAnimalList');
  const response = await fetch('http://localhost:3000/api/animals');
  const data = await response.json();
     
  const animalListContainer = document.getElementById('animal-list-container');
  
  data.forEach(animal => {
    const newAnimalTr = document.createElement('tr');

    console.log(animal  );
      
    newAnimalTr.id = animal.id;
    newAnimalTr.innerHTML = `
      <td>${animal.name}</td>
      <td>${animal.breed}</td>
      <td>${animal.age}</td>
      <td>${animal.weight}</td>
      <td>${animal.owner_name}</td>
      <td>${animal.is_vacinated}</td>
    `;
  
    animalListContainer.appendChild(newAnimalTr);
  });
}

getAnimalList();
