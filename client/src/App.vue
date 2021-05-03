<template>
  <div id="app">

    <h1 id="title" class="title">
      Cadastro de Clientes
    </h1>
    <div class="field has-addons">
      <div class="control is-expanded" id="inputBox">
        <input class="input" maxlength="50" type="text" v-model="newClient.name" placeholder="Nome">
        <input class="input" type="text" v-model="newClient.CPF" placeholder="CPF" v-mask="'###.###.###-##'">
        <input class="input" maxlength="50" type="email" v-model="newClient.email" placeholder="E-mail">
        <input class="input" type="text" v-model="newClient.phone" placeholder="Telefone" v-mask="'(##) # ####-####'">

      </div>
    </div>

    <div id="addButton" class="control">
      <a class="button is info" @click="addClient">Adicionar</a>
    </div>

    <div class="notification" v-for="(client, i) in clients" :key="client._id">
      <div class="columns">
        <input class="column input" maxlength="50" type="text" placeholder="Nome" v-if="selected._id == client._id" v-model="editedClient.name" />
        <input class="column input" type="text" placeholder="CPF" v-mask="'###.###.###-##'" v-if="selected._id == client._id" v-model="editedClient.CPF" />
        <input class="column input" maxlength="50" type="email" placeholder="E-mail" v-if="selected._id == client._id" v-model="editedClient.email" />
        <input class="column input" type="text" placeholder="Telefone" v-mask="'(##) # ####-####'" v-if="selected._id == client._id" v-model="editedClient.phone" />

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

      if (this.basicValidation(this.newClient)){
        
        this.newClient.phone = this.newClient.phone.replace(/\D/g, "");
        const { name, CPF, email, phone } = this.newClient;
  
        const res = await axios.post('api/clientes/', { name, CPF, email, phone })
          .catch((err)=>{
            window.alert(`${err.response.data[0].message}`)
          })

        if(res) {
          
          this.clients.push({ name, CPF, email, phone });
          this.selected._id = ""
          this.newClient = {
            name: "",
            CPF: "",
            email: "",
            phone: ""
          }
        }

      }

    },

    async updateClient(client, i) {

      if (this.basicValidation(client)){
      
        client.phone = client.phone.replace(/\D/g, "");
        const { _id, name, CPF, email, phone } = client;
  
        const res = await axios.put('api/clientes/' + _id, { name, CPF, email, phone })
          .catch((err)=>{
              window.alert(`${err.response.data[0].message}`);
          })

        if (res) {
          
          this.clients[i] = client;
          this.unselect();

        }
        
      
      }

    },
    
    async removeClient(client, i) {
      
      await axios.delete('api/clientes/' + client._id);
      this.clients.splice(i, 1);

    },

    select(client) {
      this.selected = client;
      this.editedClient = client;
    },

    unselect() {
      this.selected = {};
      this.editedClient = "";
    },

    basicValidation (client) {

      const { name, CPF, email, phone } = client;


      // Checking if there's an empty field
      if (name == "") {
        window.alert('Campo nome não preenchido');
        return false
      }

      if (CPF == ""){
        window.alert('Campo CPF não preenchido');
        return false
      }

      if (email == "") {
        window.alert('Campo e-mail não preenchido');
        return false
      } 

      if (phone == "") {
        window.alert('Campo telefone não preenchido');
        return false
      }
      

      // checking if the pearson has at leat two names
      if (name.split(" ").length < 2) {
        window.alert('Campo nome deve conter ao menos dois nomes');
        return false
      }

      // Checking if email have only one @ symbol
      let substringsEmail = email.split('@')
      if(substringsEmail.length != 2) {
        window.alert('E-mail inválido');
        return false
      }

      // checking if CPF has the right amount of char
      if (CPF.length != 14){
        console.log(CPF.length)
        window.alert('CPF inválido');
        return false
      }
      
      // checking if phone has the right amount of char
      if (phone.length != 16){
        window.alert('Telefone inválido');
        return false
      }
      
      
      return true
    }
  }
};


</script>

<style>

#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 900px;
}

#addButton {
  margin-bottom: 3rem;
}

.icon {
  margin: 0.5rem;
}

.input{
  margin: 0.5rem;
}

.material-icons:hover {
  cursor: pointer;
}

#tag {
  margin-right: 3em;
}

</style>
