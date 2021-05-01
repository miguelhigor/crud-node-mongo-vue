

class ClientsService {

    async create ({ CPF, name, email, phone }) {

        return { CPF, name, email, phone }
        
    }

    async listAllClients () {

        return { "message": "Here goes all the clients on the database!"}

    }

    async update ({ CPF, name, email, phone }) {

        return { CPF, name, email, phone }

    }

    async deleteClient (client) {

        console.log(client)
        return {"message": `Client ${client.CPF} deleted!`}

    }
}

export { ClientsService }