const request = require('supertest');
const app = require('../app');
describe('SUCCESS ADMIN POST /login', function() {
    it('responds with token in json', function(done) {
      request(app)
        .post('/login')
        .send({email: 'admin@mail.com', password: '1234'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            global.tokenAdmin = response.body.token;
            expect(status).toBe(200);
            expect(body).toHaveProperty('token', expect.any(String));
            done();
        })
    });
});

describe('SUCCESS GUEST POST /login', function() {
    it('responds with token in json', function(done) {
      request(app)
        .post('/login')
        .send({email: 'guest@mail.com', password: '1234'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            global.tokenGuest = response.body.token;
            expect(status).toBe(200);
            expect(body).toHaveProperty('token', expect.any(String));
            done();
        })
    });
});

describe('WRONG PASSWORD POST /login', function() {
    it('responds with error message', function(done) {
      request(app)
        .post('/login')
        .send({email: 'admin@mail.com', password: '123'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty('message', 'Wrong Password');
            done();
        })
    });
});

describe('WRONG USERNAME POST /login', function() {
    it('responds with error message', function(done) {
      request(app)
        .post('/login')
        .send({email: 'unknown@mail.com', password: '1234'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty('message', 'User not found');
            done();
        })
    });
});