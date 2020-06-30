const { User } = require('../models');
const jwt = require('jsonwebtoken');

function authentication(req, res, next){
    const { token } = req.headers;
    if(!token){
        next({ name: 'TokenNotFound' });
    } else {
        req.userData = jwt.verify(token, process.env.JWT);
        User.findByPk(req.userData.id)
        .then(data => {
            if(!data){
                throw { name: 'UserNotFound' };
            } else {
                next();
            }
        })
        .catch(err => next(err));
    }
}

function authorization(req, res, next){
    User.findByPk(req.userData.id)
    .then(data => {
        if(!data){
            throw { name: 'UserNotFound' };
        } else if(data.role !== 'admin'){
            throw { name: 'Unauthorized' };
        } else {
            next();
        }
    })
    .catch(err => next(err));
}

module.exports = { authentication, authorization };