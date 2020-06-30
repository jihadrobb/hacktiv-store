'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model {

  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input email'
        },
        notEmpty: {
          msg: 'Please input email'
        },
        isEmail: {
          msg: 'Please input right email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input password'
        },
        notEmpty: {
          msg: 'Please input password'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input role'
        },
        notEmpty: {
          msg: 'Please input role'
        }
      }
    }
  }, {
    sequelize
  });
  User.beforeCreate((instance, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(instance.password, salt);
    instance.password = hash;
    if(!instance.role){
      instance.role = 'guest';
    }
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};