const createServiceTypeButton = document.getElementById('create-service-type-button');

createServiceTypeButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const name = document.querySelector('input[name="nameServiceType"]').value;
  const price = document.querySelector('input[name="priceServiceType"]').value;
  const duration = document.querySelector('input[name="durationServiceType"]').value;

  const serviceTypes = document.querySelectorAll('tr > td')

  serviceTypes.forEach(td => {
    const tr = td.parentNode
    tr.remove()
  })

  await fetch('http://localhost:3000/api/services-types', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      name,
      price,
      duration,
    })
  });

  await getServiceTypeList();
});

async function getServiceTypeList() {
  console.log('getServiceTypeList');
  const response = await fetch('http://localhost:3000/api/services-types');
  const data = await response.json();
    
  const serviceRows = document.querySelectorAll('#service-list-container tr');
  serviceRows.forEach(row => row.remove());
  
  const servicesTypeListContainer = document.getElementById('service-list-type-container');
  
  data.forEach(serviceType => {
    const newServiceTypeTr = document.createElement('tr');
      
    newServiceTypeTr.id = serviceType.id;
    newServiceTypeTr.innerHTML = `
      <td>${serviceType.name}</td>
      <td>${serviceType.price}</td>
      <td>${serviceType.duration + ' horas'}</td>
    `;
  
    servicesTypeListContainer.appendChild(newServiceTypeTr);
  });
}

getServiceTypeList();
