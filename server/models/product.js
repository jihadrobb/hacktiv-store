'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Product extends Model {

  }
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
    sequelize
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};