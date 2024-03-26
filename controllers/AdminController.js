const { s3Client } = require('../config/s3Client');
const { PutObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3');
const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const Media = require('../models/Media');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Quota = require('../models/Quota');
const bcrypt = require('bcrypt');

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

module.exports.changeBillboard_post = async (req, res) => {
    try {
        const picture = req.file.originalname;
        const file = req.file.buffer;
        const type = req.file.mimetype;
        const media = await Media.findOne();
        if (media && media.billboard) {
            const oldPictureUrl = new URL(media.billboard);
            const oldPictureKey = decodeURIComponent(oldPictureUrl.pathname.substring(1));
            const deleteParams = {
                Bucket: process.env.BUCKET,
                Key: oldPictureKey,
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));
        }
        if(type !== 'image/jpeg' && type !== 'image/png'){
            res.status(400).json({message: 'Invalid file type!'});
            return;
        }
        const date = new Date();
        const newFileName = bcrypt.hashSync(picture + date.toISOString(), 10);
        const uploadParams = {
            Bucket: process.env.BUCKET,
            Key: newFileName,
            Body: file,
            ACL: 'public-read',
            ContentType: type
        };
        await s3Client.send(new PutObjectCommand(uploadParams));
        const pictureUrl = `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodeURIComponent(uploadParams.Key)}`;
        media.billboard = pictureUrl;
        await media.save();
        res.status(200).json(media.billboard);
    } catch (err) {
        res.status(500).json({ message: 'Server Error! wennn', err: err });
    }
};

module.exports.changeBillboardMb_post = async (req, res) => {
    try {
        const picture = req.file.originalname;
        const file = req.file.buffer;
        const type = req.file.mimetype;
        const media = await Media.findOne();
        if (media && media.billboard_mb) {
            const oldPictureUrl = new URL(media.billboard_mb);
            const oldPictureKey = decodeURIComponent(oldPictureUrl.pathname.substring(1));
            const deleteParams = {
                Bucket: process.env.BUCKET,
                Key: oldPictureKey,
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));
        }
        if(type !== 'image/jpeg' && type !== 'image/png'){
            res.status(400).json({message: 'Invalid file type!'});
            return;
        }
        const date = new Date();
        const newFileName = bcrypt.hashSync(picture + date.toISOString(), 10);
        const uploadParams = {
            Bucket: process.env.BUCKET,
            Key: newFileName,
            Body: file,
            ACL: 'public-read',
            ContentType: type
        };
        await s3Client.send(new PutObjectCommand(uploadParams));
        const pictureUrl = `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodeURIComponent(uploadParams.Key)}`;
        media.billboard_mb = pictureUrl;
        await media.save();
        res.status(200).json(media.billboard_mb);
    } catch (err) {
        res.status(500).json({ message: 'Server Error! wennn', err: err });
    }
};

module.exports.changeVideo_post = async (req, res) => {
    try{
        const video = req.file.originalname;
        const file = req.file.buffer;
        const type = req.file.mimetype;
        const media = await Media.findOne();
        if(media && media.video){
            const oldVideoUrl = new URL(media.video);
            const oldVideoKey = decodeURIComponent(oldVideoUrl.pathname.substring(1));
            const deleteParams = {
                Bucket: process.env.BUCKET,
                Key: oldVideoKey,
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));
        }
        if(type !== 'video/mp4'){
            res.status(400).json({message: 'Invalid file type!'});
            return;
        }
        const date = new Date();
        const newFileName = bcrypt.hashSync(video + date.toISOString(), 10);
        const params = {
            Bucket: process.env.BUCKET,
            Key: newFileName,
            Body: file,
            ACL: 'public-read',
            ContentType: type
        };
        await s3Client.send(new PutObjectCommand(params));
        const videoUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodeURIComponent(params.Key)}`;
        media.video = videoUrl;
        await media.save();
        res.status(200).json(media.video);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.addProduct_post = async (req, res) => {
    try{
        const { name, description, ref, category } = req.body;
        const picture = req.files.picture[0].originalname;
        const type = req.files.picture[0].mimetype;
        const file = req.files.picture[0].buffer;
        if(type !== 'image/jpeg' && type !== 'image/png'){
            res.status(400).json({message: 'Invalid file type!'});
            return;
        }
        const date = new Date();
        const newFileName = bcrypt.hashSync(picture + date.toISOString(), 10);
        const params = {
            Bucket: process.env.BUCKET,
            Key: newFileName,
            Body: file,
            ACL: 'public-read',
            ContentType: type
        };
        const data = await s3Client.send(new PutObjectCommand(params));
        const pictureUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodeURIComponent(params.Key)}`;
        const cat = await Category.findOne({ name: category });
        if(!cat){
            res.status(404).json({message: 'Category not found!'});
            return;
        }
        const product = new Product({ name, description, picture: pictureUrl, ref, category: cat._id});
        await product.save();
        new_product = await Product.findOne({ ref })
        cat.products.push(new_product._id);
        await cat.save();
        res.status(201).json(product);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!', err:err});
    }
};

module.exports.deleteProduct_post = async (req, res) => {
    try{
        const { ref } = req.body;
        const product = await Product.findOne({ ref });
        if(product){
            const pictureUrl = new URL(product.picture);
            const pictureKey = decodeURIComponent(pictureUrl.pathname.substring(1));
            const deleteParams = {
                Bucket: process.env.BUCKET,
                Key: pictureKey,
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));
            cat = await Category.findById(product.category);
            cat.products = cat.products.filter(p => p.toString() !== product._id.toString());
            await cat.save();
            await product.deleteOne();
            res.status(200).json({message: 'Product deleted!'});
        }
        else{
            res.status(404).json({message: 'Product not found!'});
        }
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.editProduct_post = async (req, res) => {
    try{
        const { ref } = req.body;
        const product = await Product.findOne({ ref }); 
        if(product){
            if(product.picture){
                const oldPictureUrl = new URL(product.picture);
                const oldPictureKey = decodeURIComponent(oldPictureUrl.pathname.substring(1));
                const deleteParams = {
                    Bucket: process.env.BUCKET,
                    Key: oldPictureKey,
                };
                await s3Client.send(new DeleteObjectCommand(deleteParams));
            }
            const picture = req.files.picture[0].originalname;
            const type = req.files.picture[0].mimetype;
            const file = req.files.picture[0].buffer;
            if(type !== 'image/jpeg' && type !== 'image/png'){
                res.status(400).json({message: 'Invalid file type!'});
                return;
            }
            const date = new Date();
            const newFileName = bcrypt.hashSync(picture + date.toISOString(), 10);
            const params = {
                Bucket: process.env.BUCKET,
                Key: newFileName,
                Body: file,
                ACL: 'public-read',
                ContentType: type
            };
            const data = await s3Client.send(new PutObjectCommand(params));
            const pictureUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodeURIComponent(params.Key)}`;
            product.name = req.body.name;
            product.description = req.body.description;
            product.ref = req.body.ref;
            product.picture = pictureUrl;
            await product.save();
            res.status(200).json(product);
        }
        else{
            res.status(404).json({message: 'Product not found!'});
        }
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.readQuota_post = async (req, res) => {
    try{
        const { id } = req.body;
        const quota = await Quota.findById(id);
        if(quota){
            quota.read = true;
            await quota.save();
            res.status(200).json(quota);
        }
        else{
            res.status(404).json({message: 'Quota not found!'});
        }
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.deleteQuota_post = async (req, res) => {
    try{
        const { id } = req.body;
        const quota = await Quota.findById(id);
        if(quota){
            await quota.deleteOne();
            res.status(200).json({message: 'Quota deleted!'});
        }
        else{
            res.status(404).json({message: 'Quota not found!'});
        }
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.addCategory_post = async (req, res) => {
    try{
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};

module.exports.deleteCategory_post = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findOne({ name });
        if (category) {
            await Product.deleteMany({ _id: { $in: category.products } });
            await category.deleteOne();
            res.status(200).json({ message: 'Category and associated products deleted!' });
        } else {
            res.status(404).json({ message: 'Category not found!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error!' });
    }
};


module.exports.getQuotas_get = async (req, res) => {
    try{
        const quotas = await Quota.find();
        if(quotas.length === 0){
            res.status(404).json({message: 'No Quotas found!'});
            return;
        }
        else{
            res.status(200).json(quotas);
        }
    }
    catch(err){
        res.status(500).json({message: 'Server Error!'});
    }
};