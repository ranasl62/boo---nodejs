const mongoose = require('mongoose');
const VOTE_TYPES = require("./../utils/static-data/voteOption");

const commentSchema = new mongoose.Schema({
    profileCommentId: {type: Number, required: true}, // ID of the profile who posted the comment
    profileId: {type: Number, required: true}, // ID of the user profile the comment belongs to
    mbti: {
        type: String,
        enum: VOTE_TYPES["MBTI"],
    },
    enneagram: {
        type: String,
        enum: VOTE_TYPES["Enneagram"],
    },
    zodiac: {
        type: String,
        enum: VOTE_TYPES["Zodiac"],
    },
    title: {type: String, require: true},
    comment: {type: String, require: true},
    likes: {type: Number, default: 0},
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
}, {toJSON: {virtuals: true}});

// Method to increment likes
commentSchema.methods.incrementLikes = async function () {
    this.likes += 1;
    await this.save();
};

// Method to decrement likes
commentSchema.methods.decrementLikes = async function () {
    if (this.likes > 0) {
        this.likes -= 1;
        await this.save();
    }
};
commentSchema.methods.getCurrentLike = async function () {
    return this.likes;
}


// Populate profileCommentId field with corresponding profile data
commentSchema.virtual('profileOwner', {
    ref: 'Profile',
    localField: 'profileId',
    foreignField: '_id',
    justOne: true
});

// Populate profileCommentId field with corresponding profile data
commentSchema.virtual('commenter', {
    ref: 'Profile',
    localField: 'profileCommentId',
    foreignField: '_id',
    justOne: true
});
// Create a reference between the comments collection and the profiles collection
commentSchema.path('profileId').validate(async function (value) {
    const profile = await mongoose.model('Profile').findOne({_id: value});
    return !!profile;
}, 'Invalid profileId');

// Create a reference between the comments collection and the profiles collection
commentSchema.path('profileCommentId').validate(async function (value) {
    const profile = await mongoose.model('Profile').findOne({_id: value});
    return !!profile;
}, 'Invalid profileCommentId');

module.exports = mongoose.model('Comment', commentSchema);
