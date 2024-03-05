const Admin = require('../models/Admin');
const Contact = require('../models/Contact');

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
            await admin.delete();
            res.status(200).json({message: 'Admin deleted!'});
        }
        else{
            res.status(404).json({message: 'Admin not found!'});
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