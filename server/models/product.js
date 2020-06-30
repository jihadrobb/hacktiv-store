'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Order);
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input name'
        },
        notEmpty: {
          msg: 'Please input name'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input image url'
        },
        notEmpty: {
          msg: 'Please input image url'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input price'
        },
        notEmpty: {
          msg: 'Please input price'
        },
        min: {
          args: 1000,
          msg: 'Minimum price is 1000'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input stock'
        },
        notEmpty: {
          msg: 'Please input stock'
        },
        // min: {
        //   args: 0,
        //   msg: 'Minimum stock is 0'
        // },
        minimalProduct(value) {
          if(value < 0) {
            throw new Error('Minimum stock is 0!');
          }
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};