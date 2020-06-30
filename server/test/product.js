const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize
let dataId;

afterAll(() => {
    queryInterface.bulkDelete('Products')
    .then(() => done())
    .catch(err => done(err));
})

describe('SUCCESS ADMIN POST /products', function() {
    it('responds with product in json', function(done) {
      request(app)
        .post('/products')
        .send({
            name: 'test',
            image_url: 'test_aja.jpg',
            price: 2000,
            stock: 3
        })
        .set('token', global.tokenAdmin)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            dataId = body.id;
            expect(status).toBe(201);
            
            expect(body).toHaveProperty('name', expect.any(String));
            expect(body).toHaveProperty('image_url', expect.any(String));
            expect(body).toHaveProperty('price', expect.any(Number));
            expect(body).toHaveProperty('stock', expect.any(Number));
            done();
        })
        .catch(done)
    });
});

describe('NOT AUTHORIZED GUEST POST /products', function() {
    it('responds with product in json', function(done) {
      request(app)
        .post('/products')
        .send({
            name: 'test',
            image_url: 'test_aja.jpg',
            price: 2000,
            stock: 3
        })
        .set('token', global.tokenGuest)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(403);
            expect(body).toHaveProperty('message', 'Not Authorized to do this');
            done();
        })
        .catch(done)
    });
});

describe('VALIDATIONS POST /products', function() {
    it('responds with product in json', function(done) {
      request(app)
        .post('/products')
        .send({
            name: '',
            image_url: '',
            price: 0,
            stock: -1
        })
        .set('token', global.tokenAdmin)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            console.log(body);
            expect(status).toBe(400);
            expect(body.errorCode).toEqual("SequelizeValidationError");
            expect(body.message).toEqual(expect.arrayContaining([
                'Please input name',
                'Please input image url',
                'Minimum price is 1000',
                'Minimum stock is 0!'
              ]));
            done();
        })
        .catch((err) => {
            done(err);
        })
    });
});

describe('SUCCESS ADMIN GET /products', function() {
    it('responds with products in json', function(done) {
      request(app)
        .get('/products')
        // .send()
        .set('token', global.tokenAdmin)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Array));
            done();
        })
        .catch(done);
    });
});

describe('SUCCESS GUEST GET /products', function() {
    it('responds with products in json', function(done) {
      request(app)
        .get('/products')
        // .send()
        .set('token', global.tokenGuest)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Array));
            done();
        })
        .catch(done);
    });
});

describe('SUCCESS ADMIN GET /products/:id', function() {
    it('responds with products in json', function(done) {
      request(app)
        .get(`/products/${dataId}`)
        // .send()
        .set('token', global.tokenAdmin)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Object));
            done();
        })
        .catch(done);
    });
});

describe('SUCCESS GUEST GET /products/:id', function() {
    it('responds with products in json', function(done) {
      request(app)
        .get(`/products/${dataId}`)
        // .send()
        .set('token', global.tokenGuest)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Object));
            done();
        })
        .catch(done);
    });
});

describe('NO TOKEN GET /products', function() {
    it('responds with products in json', function(done) {
      request(app)
        .get('/products')
        // .send()
        // .set('token', global.tokenGuest)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty('message', 'Token not found');
            done();
        })
        .catch(done);
    });
});

describe('SUCCESS ADMIN PUT /products/:id', function() {
    it('responds with data in json', function(done) {
      request(app)
        .put(`/products/${dataId}`)
        .set('token', global.tokenAdmin)
        .send({
            name: 'test update',
            image_url: 'test_aja.jpg',
            price: 2000,
            stock: 3
        })
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty('name', expect.any(String));
            expect(body).toHaveProperty('image_url', expect.any(String));
            expect(body).toHaveProperty('price', expect.any(Number));
            expect(body).toHaveProperty('stock', expect.any(Number));
            done();
        })
        .catch(err => console.log(err));
    });
});

describe('NOT AUTHORIZED PUT /products/:id', function() {
    it('responds with data in json', function(done) {
      request(app)
        .put(`/products/${dataId}`)
        .set('token', global.tokenGuest)
        .send({
            name: 'test update',
            image_url: 'test_aja.jpg',
            price: 2000,
            stock: 3
        })
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(403);
            expect(body).toHaveProperty('message', 'Not Authorized to do this');
            done();
        })
        .catch(err => console.log(err));
    });
});

describe('NOT FOUND PUT /products/:id', function() {
    it('responds with success message in json', function(done) {
      request(app)
        
        .put(`/products/0`)
        .set('token', global.tokenAdmin)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            console.log(body);
            expect(status).toBe(404);
            expect(body).toHaveProperty('message', 'Data not found');
            done();
        })
        .catch(done);
    });
});

describe('VALIDATIONS PUT /products', function() {
    it('responds with product in json', function(done) {
      request(app)
        .put(`/products/${dataId}`)
        .send({
            name: '',
            image_url: '',
            price: 0,
            stock: -1
        })
        .set('token', global.tokenAdmin)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            console.log(body);
            expect(status).toBe(400);
            expect(body.errorCode).toEqual("SequelizeValidationError");
            expect(body.message).toEqual(expect.arrayContaining([
                'Please input name',
                'Please input image url',
                'Minimum price is 1000',
                'Minimum stock is 0!'
              ]));
            done();
        })
        .catch((err) => {
            done(err);
        })
    });
});

describe('NOT AUTHORIZED DELETE /products/:id', function() {
    it('responds with success message in json', function(done) {
      request(app)
        
        .delete(`/products/${dataId}`)
        .set('token', global.tokenGuest)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            console.log(body);
            expect(status).toBe(403);
            expect(body).toHaveProperty('message', 'Not Authorized to do this');
            done();
        })
        .catch(done);
    });
});

describe('NOT FOUND DELETE /products/:id', function() {
    it('responds with success message in json', function(done) {
      request(app)
        
        .delete(`/products/0`)
        .set('token', global.tokenAdmin)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            console.log(body);
            expect(status).toBe(404);
            expect(body).toHaveProperty('message', 'Data not found');
            done();
        })
        .catch(done);
    });
});

describe('SUCCESS ADMIN DELETE /products/:id', function() {
    it('responds with success message in json', function(done) {
      request(app)
        
        .delete(`/products/${dataId}`)
        .set('token', global.tokenAdmin)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            console.log(body);
            expect(status).toBe(200);
            expect(body).toHaveProperty('message', 'Data Deleted');
            done();
        })
        .catch(done);
    });
});

