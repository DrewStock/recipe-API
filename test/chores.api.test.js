const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection  = require('../lib/test-db-connection');
const app = require('../lib/app');

describe('chores routes tests', () => {

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if(connection.readyState === 1) drop();
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

    const testChore = {
        name: 'test chore',
        target: 20,
        description: 'this is a test chore'
    };

    it('GETs all chores', done => {
        request
          .get('/api/chores')
          .set('Authorization', `${token}`)
          .then(res => {
              assert.deepEqual(res.body, []);
              done();
          })
          .catch(done);
    });

    it('POSTs a chore', done => {
        request
            .post('/api/chores')
            .set('Authorization', `${token}`)
            .send(testChore)
            .then(res => {
                const chore = res.body;
                testChore.__v = 0;
                testChore._id = chore._id;
                done();
            })
            .catch(done);
    });

    it('GETs chore by ID', done => {
        request
            .get(`/api/chores/${testChore._id}`)
            .set('Authorization', `${token}`)
            .then(res => {
                const chore = res.body;
                assert.deepEqual(chore, testChore);
                done();
            })
            .catch(done);
    });

    it('DELETEs a chore', done => {
        request
            .delete(`/api/chores/${testChore._id}`)
            .set('Authorization', `${token}`)
            .then(res => {
                assert.deepEqual(res.body, testChore);
                done();
            })
            .catch(done);
    });

});
