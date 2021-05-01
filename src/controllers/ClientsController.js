import { ClientsService } from "../services/ClientsService.js";



class ClientsController {


    async create (req, res) {

        const clientsService = new ClientsService();
        
        const { CPF, name, email, phone } = req.body;
        const client = await clientsService.create({
            CPF, 
            name, 
            email, 
            phone
        });

        if (client){
            res.status(200).json(client);
        } else {
            res.status(400).json({message: "Error"})
        }

    }

    async getAllClients (req, res) {
    
        const clientsService = new ClientsService();
        const clientsList = await clientsService.listAllClients();

        if (clientsList){
            res.status(200).json(client);
        } else {
            res.status(400).json({message: "Error"})
        }
        
    }

    async update (req, res) {

        const clientsService = new ClientsService();

        const { CPF, name, email, phone } = req.body;
        const client = await clientsService.update({
            CPF, 
            name, 
            email, 
            phone
        });
        
        if (client){
            res.status(200).json(client);
        } else {
            res.status(400).json({message: "Error"})
        }

    }


    async delete (req, res) {

        const { CPF } = req.body;

        const clientsService = new ClientsService();
        const client = await clientsService.deleteClient({CPF});

        if (client){
            res.status(200).json(client);
        } else {
            res.status(400).json({message: "Error"})
        }

    }
}

export { ClientsController }