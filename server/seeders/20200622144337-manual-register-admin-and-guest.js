'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync('1234', salt);
    
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password: hashedPass,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'guest@mail.com',
      password: hashedPass,
      role:'guest',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
