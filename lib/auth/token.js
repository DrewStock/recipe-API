const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET || 'chores-are-awesome';

module.exports = {
    sign(user) {
        return new Promise((resolve, reject) => {
            const payload = {
                id: user._id
                // Add characteristics that would enable additional user privileges
            };

            jwt.sign(payload, secret, null, (err, token) => {
                if(err) return reject(err);
                resolve(token);
            });
        });
    },

    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, payload) => {
                if(err) return reject(err);
                resolve(payload);
            });
        });
    }
};
