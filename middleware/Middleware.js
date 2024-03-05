const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Token = require('../models/Token');

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const currentTime = Math.floor(Date.now() / 1000);
    if(token){
        try{
            const accessPayload = jwt.verify(token, process.env.SECRET_JWT);
            const ARtoken = await Token.findOne({ accessToken: token });
            if(ARtoken){
                if(accessPayload.exp < currentTime){
                    res.status(401).json({message: 'Token Expired!'});
                }
                else{
                    next();
                }
            }
            else{
                res.status(404).json({message: 'Token Not Found!'});
            }
        }
        catch(err){
            res.status(500).json({message: 'Server Error!'});
        }
    }
    else{
        res.status(403).json({message: 'Token Not Received!'});
    }
};

const requireLevelOne = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(token){
        try{
            const accessPayload = jwt.verify(token, process.env.SECRET_JWT);
            const ARtoken = await Token.findOne ({ accessToken: token });
            const admin = await Admin.findById(ARtoken.admin);
            if (admin){
                if(admin.level === 1){
                    next();
                }
                else{
                    res.status(403).json({message: 'Unauthorized!'});
                }
            }
            else{
                res.status(404).json({message: 'Admin Not Found!'});
            }
        }
        catch(err){
            res.status(500).json({message: 'Server Error!'});
        }
    }
    else{
        res.status(403).json({message: 'Token Not Received!'});
    }
};

module.exports = { requireAuth, requireLevelOne };