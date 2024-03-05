const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Token = require('../models/Token');

const createAccessToken = (id) => {
    const expiresIn = '15m';
    const secret = process.env.SECRET_JWT;
    const token = jwt.sign( { id }, secret, { expiresIn });
    return token;
    };

const createRefreshToken = (id) => {
    const expiresIn = '7d';
    const secret = process.env.SECRET_REFRESH_JWT;
    const token = jwt.sign( { id }, secret, { expiresIn });
    return token;
    };

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try{
        const admin = await Admin.login(email, password);
        if (admin) {
            const accessToken = createAccessToken(admin._id);
            const refreshToken = createRefreshToken(admin._id);
            const ARtoken = new Token({
                admin: admin._id,
                refresh_token: refreshToken,
                access_token: accessToken
            });
            await ARtoken.save();
            res.status(200).json({admin: admin._id, accessToken, level: admin.level});
        }
        else{
            res.status(400).json({message: 'Invalid email or password'});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server Error'});
    }
};