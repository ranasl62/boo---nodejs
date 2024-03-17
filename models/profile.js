const mongoose = require('mongoose');
const VOTETYPE = require("./../utils/static-data/voteOption");

const profileSchema = new mongoose.Schema({
    _id: {type: Number}, // Require _id field
    name: {type: String, required: true}, // Require name field
    description: String, // Optional description field
    mbti: {type: String, enum: VOTETYPE["MBTI"]}, // MBTI must be one of the listed values
    enneagram: {type: String, enum: VOTETYPE["Enneagram"]}, // Enneagram must be one of the listed values
    zodiac: {type: String, enum: VOTETYPE["Zodiac"]},// Zodiac must be one of the listed values
    variant: String,
    tritype: Number,
    socionics: String,
    temperaments: String,
    sloan: String,
    psyche: String,
    image: String
});


const Counter = mongoose.model('Counter', new mongoose.Schema({
    _id: {type: String, required: true},
    sequence_value: {type: Number, default: 0}
}));


// Increment the ID field for new documents
profileSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next(); // Only generate ID for new documents
    }

    try {
        const counter = await Counter.findByIdAndUpdate(
            {_id: 'profileId'},
            {$inc: {sequence_value: 1}},
            {new: true, upsert: true}
        );
        this._id = counter.sequence_value; // Assign auto-incremented ID
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Profile', profileSchema);