import { Client } from "../models/client.js"


class ClientsService {

    async create ({ CPF, name, email, phone }) {

        const client = await Client.create({CPF, name, email, phone})
        return client
        
    }

    async listAllClients () {

        const clients = await Client.find({})
        return clients 

    }

    async update ({ CPF, name, email, phone }) {

        const client = await Client.findOne({CPF}).update({ CPF, name, email, phone })
        return client 

    }

    async deleteClient ({ CPF, name, email, phone }) {

        const client = await Client.deleteOne({CPF})
        return client 

    }
}

export { ClientsService }