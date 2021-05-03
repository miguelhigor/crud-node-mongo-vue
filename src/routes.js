import { Router } from "express"
import { ClientsController } from "./controllers/ClientsController.js";

const clientsController = new ClientsController();
const routes = Router();

// Client routes list
routes.get('/', clientsController.getAllClients);
routes.post('/', clientsController.create);
routes.put('/:id', clientsController.update);
routes.delete('/:_id', clientsController.delete);


export { routes }