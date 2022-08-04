const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    name: { type: String, required: true},
    description: String,
    image: URL,
    location: String
})

const Plant = mongoose.model('Plant', plantSchema)

module.exports = Plant;

