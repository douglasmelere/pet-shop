const createServiceButton = document.getElementById('create-service-button');

createServiceButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const name = document.querySelector('input[name="nameService"]').value;
  const scheduled_date = document.querySelector('input[name="dateService"]').value;
  const animal = document.getElementById('animalService');

  const services = document.querySelectorAll('tr > td')

  services.forEach(td => {
    const tr = td.parentNode
    tr.remove()
  })

  console.log(name, scheduled_date, animal);

  await fetch('http://localhost:3000/api/services', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      service_type: name,
      scheduled_date,
      animal,
    })
  });

  await getServiceList();
});

async function getServiceList() {
  console.log('getServiceList');
  const response = await fetch('http://localhost:3000/api/services');
  const data = await response.json();

  const servicesListContainer = document.getElementById('service-list-container');

  // Clear existing rows

  data.forEach(service => {
    const newServiceTr = document.createElement('tr');

    const serviceId = service.id;
    newServiceTr.id = serviceId;
    newServiceTr.innerHTML = `
      <td>${service.service_type}</td>
      <td>${service.scheduled_date}</td>
      <td>${service.animal}</td>
    `;

    servicesListContainer.appendChild(newServiceTr);
  });
}

getServiceList();
