const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/test-db-connection');
const app = require('../lib/app');

describe('user routes tests', () => {

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if (connection.readyState === 1) drop();
        else {
            connection.on('open', drop);
        }
    });

    const request = chai.request(app);

    let token = '';

    let tester = { username: 'testUser', name: 'Test', password: 'pass1234'};

    it('POSTs a user', done => {
        request
            .post('/api/auth/signup')
            .send(tester)
            .then(res => {
                assert.ok(token = res.body.token);
                done();
            })
            .catch(done);
    });

    it('/GETs a user', done => {
        request
        .get('/api/users')
        .set('Authorization', `${token}`)
        .then(res => {
            const user = res.body;
            assert.deepEqual(user.username, tester.username);
            assert.deepEqual(user.name, tester.name);
            done();
        })
        .catch(done);
    });

});
