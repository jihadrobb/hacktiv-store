const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class Controller {
    static login(req, res, next){
        User.findOne({ where: { email: req.body.email }})
        .then(data => {
            if(!data){
                throw { name: 'UserNotFound' };
            } else if(!bcrypt.compareSync(req.body.password, data.password)){  // add ! after debug
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

}
module.exports = Controller;