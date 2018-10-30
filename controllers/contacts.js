//Contacts Service
const contactsService = require('../services/contacts');


class Contacts{
    constructor(router){
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes(){
        this.router.get('/contacts/:id?',this.getContacts);
        this.router.post('/contacts', this.postContact);
    }

    //Get Contacts
    async getContacts(req,res,next){
        //Request a specific contact submission
        try{
            if(req.params.id){
                let contact =  await contactsService.getContacts(req.params.id);
                res.send(contact);

            }else{
                let contacts = await contactsService.getContacts();
                res.send(contacts);
            }

        }catch (err){
            next(err);
        }
    }
    //Get A Contact

    //Post A Contact
     async postContact(req,res,next){
        try{
            let contact = await contactsService.create(req.body);
            res.setStatus = 201;
            res.send(contact);
        }catch (err){
            next(err);
        }
    }

    //Delete A Contact
}

module.exports = Contacts;
