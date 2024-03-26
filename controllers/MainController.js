const Category = require('../models/Category');
const Contact = require('../models/Contact');
const Media = require('../models/Media');
const Product = require('../models/Product');
const Quota = require('../models/Quota');

module.exports.getProducts_get = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.getCategories_get = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.getContacts_get = async (req, res) => {
    try{
        const contact = await Contact.findOne();
        res.status(200).json(contact);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.getProductsByCategory_get = async (req, res) => {
    const { category } = req.params;
    try{
        const products = await Product.find({ category: category });
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.getProduct_get = async (req, res) => {
    const { ref } = req.params;
    try{
        const product = await Product.findOne({ ref: ref });
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.getBillboard_get = async (req, res) => {
    try{
        const media = await Media.findOne();
        res.status(200).json(media.billboard);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.getBillboardMb_get = async (req, res) => {
    try{
        const media = await Media.findOne();
        res.status(200).json(media.billboard_mb);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.getVideo_get = async (req, res) => {
    try{
        const media = await Media.findOne();
        res.status(200).json(media.video);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.addQuota_post = async (req, res) => {
    try{    
        const { name, email, phone, description } = req.body;
        const quota = new Quota({ name, email, phone, description });
        await quota.save();
        res.status(201).json(quota);
    }
    catch(err){
        console.log (err);
        res.status(500).json({message: 'Server Error!1'});
    }
};