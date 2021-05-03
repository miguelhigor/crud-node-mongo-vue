import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({

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
{ collection : 'Clients' },
{versionKey: false});

const Client = mongoose.model('Client', ClientSchema);

export { Client }