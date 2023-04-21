const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: String,
        require: true
    },
    skill: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('skill', SkillSchema);