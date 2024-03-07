const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Token = require('../models/Token');

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const currentTime = Math.floor(Date.now() / 1000);
    if(token){
        try{
            const accessPayload = jwt.verify(token, process.env.SECRET_JWT);
            const ARtoken = await Token.findOne({ access_token: token });
            if(ARtoken){
                if(accessPayload.exp < currentTime){
                    return res.status(401).json({message: 'Token Expired!'});
                }
                else{
                    return next();
                }
            }
            else{
                return res.status(404).json({message: 'Token Not Found!'});
            }
        }
        catch(err){
            if(err.name === 'TokenExpiredError'){
                return res.status(401).json({message: 'Token Expired!'});
            }
            else{
                return res.status(500).json({message: 'require auth Server Error!'});
            }
        }
    }
    else{
        return res.status(403).json({message: 'Token Not Received!'});
    }
};

const requireLevelOne = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(token){
        try{
            const ARtoken = await Token.findOne ({ access_token: token });
            const admin = await Admin.findById(ARtoken.admin);
            if (admin){
                if(admin.level === 1){
                    return next();
                }
                else{
                    return res.status(403).json({message: 'Unauthorized!'});
                }
            }
            else{
                return res.status(404).json({message: 'Admin Not Found!'});
            }
        }
        catch(err){
            return res.status(500).json({message: 'level 1 Server Error!'});
        }
    }
    else{
        return res.status(403).json({message: 'Token Not Received!'});
    }
};

module.exports = { requireAuth, requireLevelOne };