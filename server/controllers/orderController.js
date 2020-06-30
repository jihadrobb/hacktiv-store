const { Order, Product } = require('../models');
class Controller {
    static add(req, res, next) {
        Product.findByPk(req.body.ProductId)
        .then(data => {
            if(req.body.quantity > data.stock) {
                throw { name: 'StockNotEnough' };
            } else {
                console.log(data.stock, '<<< ini stock');
                console.log(req.body.quantity, '<<< ini quantity')
                return Product.update({
                    stock: Number(data.stock) - Number(req.body.quantity)
                }, { where: { id: req.body.ProductId }});
            }
        })
        .then(_=> {
            return Order.create({
                quantity: req.body.quantity,
                UserId: req.userData.id,
                ProductId: req.body.ProductId
            });
        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => next(err));
    }
    static list(req, res, next) {
        Order.findAll({ where: { UserId: req.userData.id }})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => next(err));
    }
    static delete(req, res, next) {
        let orderData;
        Order.findByPk(req.params.id)
        .then(data => {
            if(!data) {
                throw { name: 'DataNotFound' };
            } else {
                orderData = data;
                return Product.findByPk(data.ProductId);
            }
        })
        .then(data => {
            return Product.update({
                stock: Number(data.stock) + Number(orderData.quantity)
            }, {
                where: { id: data.id }
            });
        })
        .then(_=> {
            return Order.destroy({ where: { id: req.params.id }});
        })
        .then(_=> {
            res.status(200).json({ message: 'Order deleted' });
        })
        .catch(err => next(err));
    }
}
module.exports = Controller;