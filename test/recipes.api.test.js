const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/test-db-connection');
const app = require('../lib/app');

describe('api/recipes route tests', () => {

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if (connection.readyState === 1) drop();
        else {
            connection.on('open', drop);
        }
    });

    const request = chai.request(app);

    const testRecipe = {
        name: 'Test Recipe',
        description: 'This is a test recipe',
        imageUrl: '',
        ingredients: [],
        instructions: ''
    };

    const recipeUpdate = { 
        instructions: 'These are test instructions.'
    };

    it('GETs all recipes', done => {
        request
            .get('/api/recipes')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POSTs a recipe', done => {
        request
            .post('/api/recipes')
            .send(testRecipe)
            .then(res => {
                const recipe = res.body;
                testRecipe.__v = 0;
                testRecipe._id = recipe._id;
                done();
            })
            .catch(done);
    });

    it('GETs recipe by ID', done => {
        request
            .get(`/api/recipes/${testRecipe._id}`)
            .then(res => {
                const recipe = res.body;
                assert.deepEqual(recipe, testRecipe);
                done();
            })
            .catch(done);
    });

    it('UPDATES a recipe', done => {
        request
            .put(`/api/recipes/${testRecipe._id}`)
            .send(recipeUpdate)
            .then(res => {
                const updatedRecipe = res.body;
                testRecipe.__v = 0;
                testRecipe._id = updatedRecipe._id;
                testRecipe.instructions = updatedRecipe.instructions;
                assert.deepEqual(updatedRecipe, testRecipe);
                done();
            })
            .catch(done);
    });

    it('DELETEs a recipe', done => {
        request
            .delete(`/api/recipes/${testRecipe._id}`)
            .then(res => {
                assert.deepEqual(res.body, testRecipe);
                done();
            })
            .catch(done);
    });

});
