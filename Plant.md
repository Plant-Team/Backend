const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({

    name: { type: String, required: true},
    description: String,
    image: String,
    location: String,
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: false
    // }
})

// const Plant = mongoose.model('Plant', plantSchema)

module.exports = plantSchema

// name: { type: String, required: true},
// description: String,
// image: String,
// location: String,
// owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: false
// }
