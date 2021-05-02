import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({

    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        auto: true
    },

    CPF: {
        type: String,
        required: true,
        unique: true
    }, 
    
    name: {
        type: String,
        required: true,
        unique: false
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    phone: {
        type: String,
        required: true,
        unique: false
    }
},
{ collection : 'clients' })

const Client = mongoose.model('Client', ClientSchema);

export { Client }