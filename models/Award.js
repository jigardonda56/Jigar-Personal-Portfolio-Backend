const mongoose = require('mongoose');
const { Schema } = mongoose;

const AwardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    subtitle: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    associatedwith: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('award', AwardSchema);