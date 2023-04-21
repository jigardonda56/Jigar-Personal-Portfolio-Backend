const mongoose = require('mongoose');
const { Schema } = mongoose;

const HeroSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: String,
        require: true
    },
    line1: {
        type: String,
        require: true
    },
    line2: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('hero', HeroSchema);