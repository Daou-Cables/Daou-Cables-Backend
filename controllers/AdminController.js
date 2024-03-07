const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const Product = require('../models/Product');

module.exports.addAdmin_post = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    try{
        const isExist = await Admin.findOne({ email });
        if(isExist){
            res.status(400).json({message: 'Admin already exists!'});
            return;
        }
        else{
            const admin = new Admin({ email, password, first_name, last_name, level: 2 });
            await admin.save();
            res.status(201).json(admin);
        }
    }
    catch(err){
        res.status(400).json({message: 'Server Error!'});
    }
};

module.exports.deleteAdmin_post = async (req, res) => {
    const { email } = req.body;
    try{
        const admin = await Admin.findOne({ email });
        if(admin && admin.level === 2){
            await admin.deleteOne();
            return res.status(200).json({message: 'Admin deleted!'});
        }
        else{
            return res.status(404).json({message: 'Admin not found!'});
        }
    }
    catch(err){
        res.status(500).json({message: 'Server Error!', err: err});
    }
};

module.exports.editContact_post = async (req, res) => {
    const { email, phone, address, fax, instagram, wechat, facebook } = req.body;
    try{
        const contact = await Contact.findOne();
        if(contact){
            contact.email = email;
            contact.phone = phone;
            contact.address = address;
            contact.fax = fax;
            contact.instagram = instagram;
            contact.wechat = wechat;
            contact.facebook = facebook;
            await contact.save();
            res.status(200).json(contact);
        }
        else{
            res.status(404).json({message: 'Contact not found!'});
        }
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.getAdmins_get = async (req, res) => {
    try{
        const admins = await Admin.find({ level: 2 });
        if(admins.length === 0){
            res.status(404).json({message: 'No Admins found!'});
            return;
        }
        else{
            res.status(200).json(admins);
        }
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.addProduct_post = async (req, res) => {
    const { name, description, picture } = req.body;
    try{
        const product = new Product({ name, description, picture });
        await product.save();
        res.status(201).json(product);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};