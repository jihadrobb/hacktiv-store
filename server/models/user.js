'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order);
    }
  };
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
    hooks: {
      beforeValidate: (instance, options) => {
        if(!instance.role) instance.role = 'guest';
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(instance.password, salt);
        instance.password = hashedPass;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};