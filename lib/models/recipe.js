const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    ingredients: [{
        ingredientId: {
            type: Number
        },
        ingredientDescription: {
            type: String
        }
    }],
    instructions: {
        type: String
    }
});

module.exports = mongoose.model('Recipe', schema);
