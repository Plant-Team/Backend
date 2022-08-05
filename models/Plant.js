const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    name: { type: String, required: true},
    description: String,
    image: String,
    location: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
})

const Plant = mongoose.model('Plant', plantSchema)

module.exports = Plant;

