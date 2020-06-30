const router = require('express').Router();
const Controller = require('../controllers/productController');
const { authentication, authorization } = require('../middlewares/auth');

router.use(authentication)
router.get('/', Controller.list);
router.get('/:id', Controller.find);
router.post('/', authorization, Controller.add);
router.put('/:id', authorization, Controller.edit);
router.delete('/:id', authorization, Controller.del);

module.exports = router;