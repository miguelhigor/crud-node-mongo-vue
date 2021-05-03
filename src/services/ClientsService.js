import { Client } from "../models/client.js";
class ClientsService {

    async create (clientEntry) {

        const { CPF, name, email, phone } = clientEntry;

        const isCpfValid = validateCPF(CPF);
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);

        const validations = allValidations(isCpfValid, isNameValid, isEmailValid, isPhoneValid);

        console.log(validations);

        // finding if there's errors
        const errors = validations.filter(field => !field.valid);
        const existsErrors = errors.length;

        if (existsErrors){
            
            throw(errors)

        }else{

            const client = await Client.create({ CPF, name, email, phone })
            return client;

        }

    }

    async listAllClients () {

        const clients = await Client.find({});
        return clients ;

    }

    async update (_id, clientEntry) {

        const { CPF, name, email, phone } = clientEntry;

        const isCpfValid = validateCPF(CPF);
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);

        const validations = allValidations(isCpfValid, isNameValid, isEmailValid, isPhoneValid);

        const errors = validations.filter(field => !field.valid);
        const existsErrors = errors.length;

        if (existsErrors){
            
            throw(errors);

        }else{

            const client = await Client.findOne({_id}).updateOne({ CPF, name, email, phone });
            return client;

        }

    }

    async deleteClient ({ _id }) {

        const client = await Client.deleteOne({ _id });
        return client;

    }

}


export { ClientsService }


function validateCPF (CPF) {
    // Checking if the string has the right amount of letters
    let getOnlyNumbers = CPF.replace(/\D/g, "");
    let cpfSize = getOnlyNumbers.length;
    if (cpfSize != 11) return false;

    // Initiating fist digit verification without the last 2 digits

    // First digit verification
    let firstDigitVerification = getOnlyNumbers.charAt(9);
    let sum = 0;
    let multiplier = 10;
    let result = 0;

    for ( let i = 0; i < cpfSize - 2; i++, multiplier-- ){
        sum = sum + parseInt(getOnlyNumbers.charAt(i)) * multiplier;
    }

    result = sum * 10 % 11;

    if(result >= 10) result = 0;

    // Comparing with the first digit
    if (result != firstDigitVerification) return false;


    // Second digit verification
    let secondDigitVerification = getOnlyNumbers.charAt(10);
    sum = 0;
    multiplier = 11;

    for ( let i = 0; i < cpfSize - 1; i++, multiplier-- ){
        sum = sum + parseInt(getOnlyNumbers.charAt(i)) * multiplier;
    }

    result = sum * 10 % 11;

    if(result >= 10) result = 0;

    // Comparing with the first digit
    if (result != secondDigitVerification) return false;


    return true;

}


function validateName (name) {

    // It shouldn't have special char or numbers
    const regexChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(regexChar.test(name)) return false;

    const regexNumber = /^([^0-9]*)$/;
    if(!regexNumber.test(name)) return false;
    

    // Should exist at least two names (first and last)
    const substringsName = name.split(' ');
    if(substringsName.length < 2) return false;


    return true;
}


function validateEmail (email) {
    
    // Email should not have special char unless "_", "-", "." and "@"
    const regex = /[ `!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
    if(regex.test(email)) return false;

    // Email string should have at least one dot, but not in the first position not the last
    if(email.indexOf('.') == -1) return false;
    if(email.charAt(0) == '.') return false;
    if(email.charAt(email.length - 1) == '.') return false;
    
    // Email should have only one @ symbol
    let substringsEmail = email.split('@');
    if(substringsEmail.length > 2) return false;
    
    return true;

}

function validatePhone (phone) {

    // It should contain only numbers and have at max 11 digits long
    const regexNumber = /^([^0-9]*)$/;
    if(regexNumber.test(phone)) return false;

    if(phone.length != 11) return false;

    return true;

}


function allValidations (isCpfValid, isNameValid, isEmailValid, isPhoneValid) {
    
    const validations = [
        {
            name: 'CPF',
            valid: isCpfValid,
            message: 'CPF inválido'
        },{
            name: 'name',
            valid: isNameValid,
            message: 'Nome Inválido'
        },{
            name: 'email',
            valid: isEmailValid,
            message: 'E-mail inválido'
        },{
            name: 'phone',
            valid: isPhoneValid,
            message: 'Telefone Inválido'
        }
    ]

    return validations;
}