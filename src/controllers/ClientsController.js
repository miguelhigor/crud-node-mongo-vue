import { ClientsService } from "../services/ClientsService.js";



class ClientsController {


    async create (req, res) {

        const clientsService = new ClientsService();
        
        const clientEntry = req.body;

        try{
            const client = await clientsService.create(clientEntry);
            res.status(201).json(client);

        }catch(error){

            console.log(error)
            res.status(400).json(error)
        }


    }

    async getAllClients (req, res) {
    
        const clientsService = new ClientsService();
        
        try {
            const clientsList = await clientsService.listAllClients();
            res.status(200).json(clientsList);
            
        } catch (error) {
            
            res.status(400).json({message: "Não foi possível carregar clientes"})
        }

    }

    async update (req, res) {

        const clientsService = new ClientsService();
        const _id = req.params;
        const clientEntry = req.body;
        
        
        try {
            
            const client = await clientsService.update(_id, clientEntry);
            res.status(200).json(client);

        } catch (error) {
            
            res.status(400).json(error);
        }
        
  
    }


    async delete (req, res) {

        const _id = req.params;

        const clientsService = new ClientsService();
        
        try {
            const client = await clientsService.deleteClient({ _id });
            res.status(200).json(client);
            
        } catch (error) {
            
            res.status(400).json({message: "Não foi possível excluir cliente"})
        }

    }
}

export { ClientsController }