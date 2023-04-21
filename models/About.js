const mongoose = require('mongoose');
const { Schema } = mongoose;

const AboutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('about', AboutSchema);