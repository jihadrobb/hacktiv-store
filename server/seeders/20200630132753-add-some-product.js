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
        name: 'Jersey Juventus Home',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/10/24/4089528/4089528_10a06a00-1f01-41dc-9481-9291dd0a7749_1500_1500.jpg',
        price: 350000,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Juventus Pink',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/3/3792496/3792496_2c064482-6476-4db3-9255-d80f8cac10f8.jpg',
        price: 300000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Liverpool Merah',
        image_url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//94/MTA-4584306/kick-somnia_kick-somnia_liverpool_home_jersey_2019-2020_full01_h33xw4cb.jpg',
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
        image_url: 'https://www.jsfootballcollection.com.my/wp-content/uploads/mu-home-pi-01-600x600.jpg',
        price: 400000,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Barcelona Home',
        image_url: 'https://myluckyjersey.com/wp-content/uploads/2019/06/done-11.png',
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
        name: 'Jersey Paris Saint Germain',
        image_url: 'https://www.soccerpro.com/wp-content/uploads/aj5817_411_nike_y_psg_home_jsy_2019_20_01.jpg',
        price: 300000,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Atletico Madrid',
        image_url: 'https://d2lhrgc5rek5ye.cloudfront.net/pub/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/a/j/aj5523-612_image.jpeg',
        price: 300000,
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Atletico Madrid Hitam',
        image_url: 'https://images.sportsdirect.com/images/products/37725444_l.jpg',
        price: 250000,
        stock: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jersey Manchester City',
        image_url: 'https://ncrsport.com/img/storage/large/847261-489-1.jpg',
        price: 300000,
        stock: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products');
  }
};
