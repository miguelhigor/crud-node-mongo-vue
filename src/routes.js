import { Router } from "express"
import { ClientsController } from "./controllers/ClientsController.js";

const clientsController = new ClientsController();
const routes = Router();

// Routes list
routes.get('/clientes', clientsController.getAllClients);
routes.post('/clientes', clientsController.create);
routes.put('/clientes', clientsController.update);
routes.delete('/clientes', clientsController.delete);


export { routes }