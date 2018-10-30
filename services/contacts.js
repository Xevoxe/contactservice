const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    author: {type: String, required:true},
    message: String
});

const contactSchema = mongoose.Schema({
    name: {type: String, required:true},
    email:{type: String, required:true},
    tele: Number,
    message: String,
    comments: [commentSchema]
});

let Contacts = mongoose.model('Contacts', contactSchema);

function getContacts(id){
    if(id){
        return Contacts.findById(id);
    }
    else {
        return Contacts.find();   
    }
}

 function create(contact){
    return Contacts.create(contact)
}

module.exports.create = create;
module.exports.getContacts = getContacts;




