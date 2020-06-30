const router = require('express').Router();
const Controller = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');

router.post('/login', Controller.login);
router.post('/register', Controller.register);

router.use(authentication)
router.get('/checkout', Controller.checkout);

module.exports = router;