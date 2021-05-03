<template>
  <div id="app">

    <h1 id="title" class="title">
      Cadastro de Clientes
    </h1>
    <div class="field has-addons">
      <div class="control is-expanded" id="inputBox">
        <input class="input" type="text" v-model="newClient.name" placeholder="Nome" required>
        <input class="input" type="text" v-model="newClient.CPF" placeholder="CPF" v-mask="'###.###.###-##'" required>
        <input class="input" type="email" v-model="newClient.email" placeholder="E-mail" required>
        <input class="input" type="text" v-model="newClient.phone" placeholder="Telefone" v-mask="'(##) # ####-####'" required>

      </div>
    </div>

    <div id="addButton" class="control">
      <a class="button is info" @click="addClient">Adicionar</a>
    </div>

    <div class="notification" v-for="(client, i) in clients" :key="client._id">
      <div class="columns">
        <input class="column input" v-if="selected._id == client._id" v-model="editedClient" />
        <p v-else class="column">
          <span id="tag" class="tag is-primary"> {{ i + 1 }} </span>
            {{ client.name }}
        </p>
        <div class="column is-narrow">
          <span class="icon has-text-primary" @click="selected._id == client._id? unselect() : select(client)">
            <i class="material-icons">{{ selected._id == client._id? "close" : "edit" }}</i>
          </span>
          <span class="icon has-text-info" @click="selected._id == client._id? updateClient(client, i) : removeClient(client, i)">
            <i id="deleteButton" class="material-icons">{{ selected._id == client._id? "save" : "delete" }}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      clients: [],
      newClient: {
        name: "",
        CPF: "",
        email: "",
        phone: ""
      },
      editedClient: {
        name: "",
        CPF: "",
        email: "",
        phone: ""
      },
      selected: {}
    };
  },
  async mounted () {

    // Get on load page
    const res = await axios.get('api/clientes/');
    this.clients = res.data;

  },
  methods: {
    async addClient() {
      
      const { name, CPF, email, phone } = this.newClient;

      if(name == "" || CPF == "" || email == "" || phone == "") window.alert('Existem campos obrigatórios não preenchidos')
      await axios.post('api/clientes/',{ name, CPF, email, phone })
      
      this.clients.push({ name, CPF, email, phone });
      this.newClient = {
        name: "",
        CPF: "",
        email: "",
        phone: 0
      }

    },
    
    async removeClient(client, i) {
      
      await axios.delete('api/clientes/' + client._id);
      this.clients.splice(i, 1);

    },

    select(client) {
      this.selected = client;
      this.editedClient = client.name;
    },

    unselect () {
      this.selected = {};
      this.editedClient = ""
    }
  }
};

</script>

<style>

#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}

#addButton {
  margin-bottom: 3rem;
}

.input{
  margin-bottom: 0.5rem;
}

#deleteButton:hover {
  cursor: pointer;
}

#tag {
  margin-right: 3em;
}

</style>
