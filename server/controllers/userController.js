const { User, Order } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class Controller {
    static login(req, res, next){
        User.findOne({ where: { email: req.body.email }})
        .then(data => {
            if(!data){
                throw { name: 'UserNotFound' };
            } else if(!bcrypt.compareSync(req.body.password, data.password)){
                throw { name: 'WrongPassword' };
            } else {
                const token = jwt.sign({
                    id: data.id,
                    email: data.email,
                    role: data.role
                }, process.env.JWT );
                return res.status(200).json({ id: data.id, email: data.email, role: data.role, token });
            }
        })
        .catch(err => next(err));
    }
    static register(req, res, next){
        User.findOne({ where: { email: req.body.email }})
        .then(data => {
            if(data) {
                throw { name: 'UserExist' };
            } else {
                return User.create({
                    email: req.body.email,
                    password: req.body.password
                })
            }
        })
        .then(data => {
            res.status(201).json({
                id: data.id,
                email: data.email
            });
        })
        .catch(err => next(err));
    }
    static checkout(req, res, next){
        let orders = [];
        Order.findAll({ where: { UserId: req.userData.id }})
        .then(data => {
            data.forEach(el => {
                Order.update({
                    paid: true
                }, { where: { id: el.id }})
            })
            res.status(200).json({ message: 'Orders paid' });
        })
        .catch(err => next(err));
    }
    static history(req, res,next){
        Order.findAll( { where: {
            UserId: req.userData.id,
            paid: true
        }})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => next(err));
    }

}
module.exports = Controller;