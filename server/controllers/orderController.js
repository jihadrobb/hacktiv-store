const { Order, Product } = require('../models');
const bull = require('bull');
const CronJob = require('cron').CronJob;
class Controller {
    static add(req, res, next) {
        // console.log(req.body, '<<<< ini req body')
        if(!req.body.quantity || !req.body.ProductId){
            let errors = [];
            if(!req.body.ProductId) errors.push('Please input ProductId');
            if(!req.body.quantity) errors.push('Please input quantity');
            next({ name: 'SequelizeValidationError', errors });
        } else { 
            Product.findByPk(req.body.ProductId)
            .then(data => {
                if(req.body.quantity > data.stock) {
                    throw { name: 'StockNotEnough' };
                } else {
                    return Product.update({
                        stock: Number(data.stock) - Number(req.body.quantity)
                    }, { where: { id: req.body.ProductId }});
                }
            })
            .then(_=> {
                return Order.findOne({ where: {
                    ProductId: req.body.ProductId,
                    paid: false
                }});
                
            })
            .then(data => {
                if(data){
                    return Order.update({
                        quantity: Number(data.quantity) + Number(req.body.quantity)
                    }, { 
                        where: { id: data.id },
                        returning: true, plain: true
                    });
                } else {
                    return Order.create({
                        quantity: req.body.quantity,
                        UserId: req.userData.id,
                        ProductId: req.body.ProductId
                    });
                }
            })
            .then(data => {
                //manggil si bull set timer 30 min
                req.idOrder = data.id;
                Controller.cronDelete(req, res, next);
                if(Array.isArray(data)){
                    res.status(200).json(data[1]);
                } else {
                    res.status(201).json(data);
                }
            })
            .catch(err => next(err));
        }
    }
    static list(req, res, next) {
        Order.findAll({ where: 
            { 
                UserId: req.userData.id,
                paid: false
            }, 
            include: [Product],
            order: [ ['id', 'ASC'] ]
        })
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
    static cronDelete(req, res, next) {
        const job = new CronJob('* */30 * * * *', function() {
            if(req.idOrder) {
                console.log('tes jalan cron delete');
                Controller.deleteWithCron(req, res, next);
            }
        }, null, true, 'Asia/Jakarta');
    }
    static deleteWithCron(req, res, next) {
        Product.findByPk(req.body.ProductId)
          .then(data => {
              if(!data) {
                  throw { name: 'DataNotFound' };
              } else {
                  return Product.update({
                    stock: Number(data.stock) + Number(req.body.quantity)
                  }, { where: { id: req.body.ProductId }})
              }
          })
          .then( _ => {
              return Order.destroy({ where: { id: req.idOrder }})
          })
          .then( _ => {
              req.idOrder = null;
          })
          .catch(err => next(err));
    }
}
module.exports = Controller;