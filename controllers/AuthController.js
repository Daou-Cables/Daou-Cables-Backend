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
            res.status(200).json({admin: admin, accessToken}).cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                //domain: '.daoucablefactory.com',
                path: '/api/auth/refreshToken'
            });
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

module.exports.refreshToken_post = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const currentTime = Math.floor(Date.now() / 1000);
    if (refreshToken) {
        try {
            const accessPayload = jwt.verify(refreshToken, process.env.SECRET_REFRESH_JWT);
            const ARtoken = await Token.findOne({ refresh_token: refreshToken });
            if (ARtoken) {
                if (accessPayload.exp > currentTime) {
                    const new_accessToken = createAccessToken(ARtoken.admin);
                    const new_refreshToken = createRefreshToken(ARtoken.admin);
                    const ARToken = new Token({
                        admin: ARtoken.admin,
                        refresh_token: new_refreshToken,
                        access_token: new_accessToken
                    });
                    await ARToken.save();
                    await Token.deleteOne({ refresh_token: refreshToken });
                    res.status(200).json({admin: ARToken.admin, accessToken: new_accessToken}).cookie('refreshToken', new_refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        //domain: '.daoucablefactory.com',
                        path: '/api/auth/refreshToken'
                    });
                }
                else {
                    res.status(401).json({message: 'Refresh Token Expired'});
                }
            }
            else {
                res.status(404).json({message: 'Token Not Found'});
            }
        }
        catch (err) {
            res.status(500).json({message: 'Server Error'});
        }
    }
    else{
        res.status(403).json({message: 'Token Not Received'});
    }
};