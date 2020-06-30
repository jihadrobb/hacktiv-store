const router = require('express').Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const orderRoutes = require('./order');

router.use('/', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;