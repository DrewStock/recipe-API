const User = require('../lib/models/user');
const assert = require('chai').assert;

describe('User model', () => {

    it('validates with username and password', done => {
        const user = new User ({
            username: 'testuser',
            password: 'password',
            name: 'Test'
        });

        user.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    it('username is required', done => {
        const user = new User ();
        user.password = 'password';
        user.name = 'Test';
        user.description = 'I love chores!';

        user.validate(err => {
            assert.isOk(err, 'username should have been required');
            done();
        });
    });


});
