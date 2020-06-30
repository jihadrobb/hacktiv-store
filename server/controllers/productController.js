const { Product } = require('../models');

class Controller {
    static add(req, res, next){
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => next(err));
    }
    static list(req, res, next){
        Product.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
    }
    static find(req, res, next){
        Product.findOne({ where: { id: req.params.id }})
        .then(data => {
            if(!data){
                throw { name: 'DataNotFound' };
            } else {
                return res.status(200).json(data);
            }
        })
        .catch(err => next(err));
    }
    static edit(req, res, next){
        Product.findOne({ where: { id: req.params.id }})
        .then(data => {
            if(!data){
                throw { name: 'DataNotFound' };
            } else {
                return Product.update({
                    name: req.body.name,
                    image_url: req.body.image_url,
                    price: req.body.price,
                    stock: req.body.stock
                }, {
                    where: { id: req.params.id },
                    returning: true, plain: true
                });
            }
        })
        .then(data => {
            res.status(200).json(data[1])
        })
        .catch(err => next(err));
    }
    static del(req, res, next){
        Product.findOne({ where: { id:req.params.id }})
        .then(data => {
            if(!data){
                throw { name: 'DataNotFound' };
            } else {
                return Product.destroy({ where: { id: req.params.id }});
            }
        })
        .then(_ => res.status(200).json({ message: 'Data Deleted' }))
        .catch(err => next(err));
    }
}
module.exports = Controller;