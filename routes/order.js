const router = require('express').Router();
const Controller = require('../controllers/orderController');
const { authentication, authorization, orderAuthorization } = require('../middlewares/auth');

router.use(authentication);
router.post('/', Controller.add);
router.get('/', Controller.list);

router.delete('/:id', orderAuthorization, Controller.delete);

module.exports = router;