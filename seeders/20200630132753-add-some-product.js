'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', 
    [
      {
        name: 'Jersey Real Madrid',
        image_url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//83/MTA-1742104/adidas_adidas-real-madrid-jersey-sepakbola-pria_full03.jpg',
        price: 300000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Jersey Juventus',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/3/3792496/3792496_2c064482-6476-4db3-9255-d80f8cac10f8.jpg',
        price: 300000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Liverpool Merah',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/10/24/4719358/4719358_6475f206-5e34-42b1-bd77-d4a04b618a41.png',
        price: 500000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Liverpool Hitam',
        image_url: 'https://id-test-11.slatic.net/p/216c5e20ba4c8be7b8f283856727d74a.jpg_720x720q80.jpg_.webp',
        price: 550000,
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Chelsea',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/6/18/24257249/24257249_ae8c9786-73a1-4a84-9611-9515763dc0bc_736_736',
        price: 300000,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Manchester United',
        image_url: 'https://cf.shopee.co.id/file/1d62d9395dd1f2cf3b0c04495bc54ee9',
        price: 400000,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Barcelona Home',
        image_url: 'https://diamu.com.bd/wp-content/uploads/2019/06/fc-barcelona-home-jersey.jpg',
        price: 550000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Barcelona Kuning',
        image_url: 'https://soccerkraze.com/wp-content/uploads/2020/01/AJ5531-728-Nike-Barca-Away-Jersey-19-20.jpg',
        price: 500000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Arsenal',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/7/12/4089528/4089528_e941c501-af98-4622-a6c2-9b0efeaf1210_1500_1500.jpg',
        price: 300000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Merah Ori',
        image_url: 'https://cf.shopee.co.id/file/290f0e06132b163ca4ef2ef93492b900',
        price: 150000,
        stock: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Putih Ori',
        image_url: 'https://cf.shopee.co.id/file/8b940f652ba4b64898fc89d817f209de',
        price: 150000,
        stock: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products');
  }
};
