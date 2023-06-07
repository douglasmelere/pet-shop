let key = 0;

async function getUserList() {
  console.log('getUserList');
  const response = await fetch('http://localhost:3000/api/user');
  const data = await response.json();

  const users = document.querySelectorAll('tr > td');

  users.forEach(td => {
    const tr = td.parentNode;
    tr.remove();
  });

  const userListContainer = document.getElementById('user-list-container');

  console.log(data);

  data.forEach(user => {
    const newUserTr = document.createElement('tr');

    newUserTr.id = user.id;
    newUserTr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.birth_date}</td>
      <td>${user.email}</td>
      <td>${user.cpf}</td>
      <td>
        <button data-key="${user.id}" class="edit-button" onclick="">Editar</button>
        <button data-key="${user.id}" class="delete-button" onclick="delete-button">Excluir</button>
      </td>
    `;

    userListContainer.appendChild(newUserTr);
  });

  const updateButton = document.querySelectorAll(".edit-button");
  
  updateButton.forEach((button) => {

    button.addEventListener("click", (e) => {

     key = e.target.closest(".edit-button").getAttribute("data-key");

     console.log(key);

     console.log(data[key].name)

      document.querySelector('input[name="name"]').value = data[key].name;
      document.querySelector('input[name="birthDate"]').value = data[key].birth_date;
      document.querySelector('input[name="email"]').value = data[key].email;
      document.querySelector('input[name="cpf"]').value = data[key].cpf;
   
    })
  })

}

getUserList();

const createUserButton = document.getElementById('create-user-button');

createUserButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const name = document.querySelector('input[name="name"]').value;
  const birth_date = document.querySelector('input[name="birthDate"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const cpf = document.querySelector('input[name="cpf"]').value;

  await fetch('http://localhost:3000/api/user', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      name,
      birth_date,
      email,
      cpf,
    })
  });

  await getUserList();
});
