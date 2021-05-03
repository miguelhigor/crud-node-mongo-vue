import { ClientsService } from "../services/ClientsService.js";



class ClientsController {


    async create (req, res) {

        const clientsService = new ClientsService();
        
        const clientEntry = req.body;

        try{
            const client = await clientsService.create(clientEntry);
            res.status(200).json(client);

        }catch(e){

            console.log(e)
            res.status(400).json({"message": e})
        }


    }

    async getAllClients (req, res) {
    
        const clientsService = new ClientsService();
        const clientsList = await clientsService.listAllClients();

        if (clientsList){
            res.status(200).json(clientsList);
        } else {
            res.status(400).json({message: "Error"})
        }
        
    }

    async update (req, res) {

        const clientsService = new ClientsService();

        const clientEntry = req.body;
        const client = await clientsService.update(clientEntry);
        
        if (client){
            res.status(200).json(client);
        } else {
            res.status(400).json({message: "Error"})
        }

    }


    async delete (req, res) {

        const _id = req.params;

        const clientsService = new ClientsService();
        const client = await clientsService.deleteClient({ _id });

        if (client){
            res.status(200).json(client);
        } else {
            res.status(400).json({message: "Error"})
        }

    }
}

export { ClientsController }