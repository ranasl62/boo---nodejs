const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    profileLikeId: {type: Number, required: true}, // ID of the user who liked the comment
    commentId: {type: String, required: true}, // ID of the comment that was liked
});
// Create a reference between the comments collection and the profiles collection
likeSchema.path('commentId').validate(async function (value) {
    const comment = await mongoose.model('Comment').findOne({_id: value});
    return !!comment;
}, 'Invalid commentId');

// Create a reference between the comments collection and the profiles collection
likeSchema.path('profileLikeId').validate(async function (value) {
    const profile = await mongoose.model('Profile').findOne({_id: value});
    return !!profile;
}, 'Invalid profileLikeId');

module.exports = mongoose.model('Like', likeSchema);
