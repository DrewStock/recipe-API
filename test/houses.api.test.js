const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/test-db-connection');
const app = require('../lib/app');

describe('house routes tests', () => {

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if (connection.readyState === 1) drop();
        else {
            connection.on('open', drop);
        }
    });

    const request = chai.request(app);

    let token = '';

    before( done => {
        request
            .post('/api/auth/signup')
            .send({ username: 'testUser', name: 'Test', password: 'pass1234'})
            .then(res => assert.ok(token = res.body.token))
            .then(done, done);
    });

    const testHouse = {
        name: 'testHouse',
        code: 'password',
        description: 'Test house best house!'
    };

    it('GETs all houses', done => {
        request
            .get('/api/houses')
            .set('Authorization', `${token}`)
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POSTs a house', done => {
        request
            .post('/api/houses')
            .set('Authorization', `${token}`)
            .send(testHouse)
            .then(res => {
                const house = res.body;
                testHouse.__v = 0;
                testHouse._id = house._id;
                testHouse.chores = [];
                testHouse.users = [];
                done();
            })
            .catch(done);
    });

    it('GETs house by ID', done => {
        request
            .get(`/api/houses/${testHouse._id}`)
            .set('Authorization', `${token}`)
            .then(res => {
                const house = res.body;
                assert.deepEqual(house, testHouse);
                done();
            })
            .catch(done);
    });

    it('DELETEs a house', done => {
        request
            .delete(`/api/houses/${testHouse._id}`)
            .set('Authorization', `${token}`)
            .then(res => {
                res.body.chores = [];
                res.body.users = [];
                assert.deepEqual(res.body, testHouse);
                done();
            })
            .catch(done);
    });

});
