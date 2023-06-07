const express = require("express");
const UserController = require("./controllers/user-controler")
const AnimalController = require("./controllers/animal-controler")
const ServiceController = require("./controllers/service-controler")

const userController = new UserController();
const animalController = new AnimalController();
const serviceController = new ServiceController();

const app = express();

app.use(express.json());
app.use("/home", express.static('./home.html'));
app.use("/services", express.static('./services.html'));
app.use("/index.css", express.static('./index.css'));
app.use("/services.css", express.static('./services.css'));
app.use("/script.js", express.static('./script.js'));
app.use("/scriptService.js", express.static('./scriptService.js'));
app.use("/services-types", express.static('./service-types.html'));
app.use("/scriptServiceType.js", express.static('./scriptServiceType.js'));
app.use("/services-type.css", express.static('./services-type.css'));
app.use("/animals", express.static('./animals.html'));
app.use("/animal.js", express.static('./animal.js'));
app.use("/animal.css", express.static('./animal.css'));

let users = [];
let animals = [];
let services = [];
let service_types = [];

app.get('/api/user', async (request, response) => {
  await userController.getAll(request, response);
});

app.get('/api/animals', async (request, response) => {
  await animalController.getAll(request, response);
});

app.get('/api/services', async (request, response) => {
  await serviceController.getAll(request, response);
});

app.get('/api/services-types', (request, response) => {
  response.json(service_types);
});

app.post('/api/user', async(request, response) => {
  try {
    await userController.create(request, response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/animals', async (request, response) => {
  try {
    await animalController.create(request, response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/services', async (request, response) => {
  try {
    await serviceController.create(request, response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/services-types', (request, response) => {
  const newServiceType = {
    id: service_types.length + 1,
    name: request.body.name,
    price: request.body.price,
    duration: request.body.duration,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  service_types.push(newServiceType);
  response.json(newServiceType);
});

app.delete('/api/user/:id', async (request, response) => {
  try {
    await userController.delete(request, response);
    response.json(`User has been deleted`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
});

app.listen(3000, () => {
  console.log(`Servidor está rodando em http://localhost:`)
});